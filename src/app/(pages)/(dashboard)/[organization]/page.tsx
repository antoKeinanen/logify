"use client";

import { PlusIcon, SearchIcon } from "lucide-react";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import ErrorPage from "~/components/error-page";
import { newSiteSchema } from "~/lib/validator/new-site";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import SiteCard from "./_components/SiteCard";

export default function DashPage({
  params,
}: {
  params: { organization: string };
}) {
  const newSiteMutation = api.site.createSite.useMutation();
  const { data: session } = useSession();
  const organizations = api.organization.getUserOrganizations.useQuery();
  const activeOrganization = organizations.data?.find(
    (org) => org.organizationId === params.organization,
  );
  const sites = api.site.getOrganizationSites.useQuery({
    id: activeOrganization?.id ?? "",
  });

  const newSiteForm = useForm<z.infer<typeof newSiteSchema>>({
    resolver: zodResolver(newSiteSchema),
    values: {
      name: "",
      url: "",
      activeOrganization: activeOrganization?.id ?? "",
    },
  });

  if (!activeOrganization) {
    return <ErrorPage>You do not have permission to view this.</ErrorPage>;
  }

  function addSite(data: z.infer<typeof newSiteSchema>) {
    // TODO: handle errors
    newSiteMutation.mutate(data);
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <section className="flex justify-between">
        <div className="relative flex gap-2">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search sites..."
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
          />
          <Select>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
          </Select>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-2">
              <PlusIcon />
              Add Site
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new site</DialogTitle>
              <DialogDescription>
                This site will be added to organization{" "}
                <strong>{session?.user.name}</strong>
              </DialogDescription>
            </DialogHeader>
            <Form {...newSiteForm}>
              <form
                className="space-y-2"
                onSubmit={newSiteForm.handleSubmit(addSite, (err) =>
                  console.error(err),
                )}
              >
                <FormField
                  control={newSiteForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site name</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Corp" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={newSiteForm.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site url</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={newSiteForm.control}
                  name="activeOrganization"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormLabel>Site url</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <DialogFooter>
              <Button variant="ghost">Cancel</Button>
              <Button
                onClick={newSiteForm.handleSubmit(addSite, (err) =>
                  console.error(err),
                )}
              >
                Create Site
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
      <section className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {sites.data?.sites.map((site, i) => (
          <SiteCard
            key={i + site.name}
            name={site.name}
            organizationId={activeOrganization.organizationId}
            siteId={site.id}
            url={site.url}
          />
        ))}
      </section>
    </main>
  );
}
