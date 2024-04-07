import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface SiteCardProps {
  name: string;
  url: string;
  organizationId: string;
  siteId: string;
}

function SiteCard({ name, url, organizationId, siteId }: SiteCardProps) {
  const router = useRouter();

  return (
    <Card
      className="hover:cursor-pointer"
      onClick={() => router.push(`/${organizationId}/${siteId}`)}
    >
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          <Link className="underline" href={url}>
            {url}
          </Link>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default SiteCard;
