import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { GeneralTab } from "./general";
import { GroupsTab } from "./groups";

interface ManageTabProps {
  form_id: string;
  on_copy_public_link: () => void;
  on_open_in_google: () => void;
}

export function ManageTab({ form_id, on_copy_public_link, on_open_in_google }: ManageTabProps) {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="groups">Group Access</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="mt-6">
        <GeneralTab
          form_id={form_id}
          on_copy_public_link={on_copy_public_link}
          on_open_in_google={on_open_in_google}
        />
      </TabsContent>

      <TabsContent value="groups" className="mt-6">
        <GroupsTab />
      </TabsContent>
    </Tabs>
  );
}
