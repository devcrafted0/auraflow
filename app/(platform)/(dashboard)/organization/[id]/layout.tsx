import { ReactNode } from "react";
import { startCase } from "lodash";
import { auth } from "@clerk/nextjs/server";
import OrgControl from "./_components/OrgControl";

export async function generateMetadata() {
  const { orgSlug } = await auth();
  const cleanSlug = orgSlug?.replace(/-[0-9]+$/, "");

  return {
    title: startCase(cleanSlug || "organization"),
  };
}

const OrganizationIdLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
