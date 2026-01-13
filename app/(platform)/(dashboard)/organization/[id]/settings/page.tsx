import { OrganizationProfile } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="w-full md:w-auto">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              width: "100%",
              boxShadow: "none",
              border: "1px solid #e5e5e5",
              borderRadius: "11px",
            },
            cardBox: {
              width: "100%",
              boxShadow: "none",
            },
          },
        }}
      />
    </div>
  );
};

export default Page;
