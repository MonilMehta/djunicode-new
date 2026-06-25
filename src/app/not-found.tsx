import { Metadata } from "next";
import NotFoundClient from "./not-found-client";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getContactDetails } from "@/lib/content";

export const metadata: Metadata = {
  title: "404 - Page Not Found | DJ Unicode",
  description: "The page you are looking for does not exist in our archive.",
};

export default function NotFound() {
  const contact = getContactDetails();

  return (
    <div className="page-frame">
      <Navbar />
      <NotFoundClient />
      <Footer contact={contact} />
    </div>
  );
}