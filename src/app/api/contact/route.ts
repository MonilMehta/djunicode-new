function validatePayload(payload) {
  if (!payload?.name?.trim()) {
    return "Name is required.";
  }

  if (payload.name.trim().length > 50) {
    return "Name must be 50 characters or fewer.";
  }

  if (!payload?.email?.trim()) {
    return "Email is required.";
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(payload.email.trim())) {
    return "Enter a valid email address.";
  }

  if (!payload?.message?.trim()) {
    return "Message is required.";
  }

  if (payload.message.trim().length > 500) {
    return "Message must be 500 characters or fewer.";
  }

  return null;
}

function parseEndpointBody(rawBody) {
  if (!rawBody) {
    return {};
  }

  try {
    return JSON.parse(rawBody);
  } catch {
    return {
      message: rawBody,
    };
  }
}

export async function POST(request) {
  const endpoint =
    process.env.CONTACT_SUBMISSION_ENDPOINT ||
    process.env.NEXT_PUBLIC_CONTACT_SUBMISSION_ENDPOINT;

  if (!endpoint) {
    return Response.json(
      {
        error:
          "CONTACT_SUBMISSION_ENDPOINT is not configured for this environment.",
      },
      { status: 500 }
    );
  }

  const payload = await request.json().catch(() => null);
  const validationError = validatePayload(payload);

  if (validationError) {
    return Response.json({ error: validationError }, { status: 400 });
  }

  const formData = new FormData();
  formData.set("name", payload.name.trim());
  formData.set("email", payload.email.trim());
  formData.set("message", payload.message.trim());

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
      cache: "no-store",
    });

    const rawBody = await response.text();
    const responseBody = parseEndpointBody(rawBody);

    if (!response.ok || responseBody.result === "error") {
      return Response.json(
        {
          error:
            responseBody.error ||
            responseBody.message ||
            "The contact submission endpoint rejected the request.",
        },
        { status: 502 }
      );
    }

    return Response.json({
      message: "Message sent successfully.",
    });
  } catch {
    return Response.json(
      {
        error: "The contact request failed before the endpoint responded.",
      },
      { status: 502 }
    );
  }
}
