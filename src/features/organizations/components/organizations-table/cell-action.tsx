"use client";

import { useState } from "react";
import {
  // Edit,
  LogOut,
  MoreHorizontal,
  Trash,
  TrashIcon
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { OrganizationT } from "./columns";
import { authClient } from "@/lib/auth-client";

import { useDeleteOrg } from "@/features/organizations/api/use-delete-org";
import { useLeaveOrg } from "@/features/organizations/api/use-leave-org";

interface CellActionProps {
  data: OrganizationT;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { data: sessionData } = authClient.useSession();

  const { mutate, isPending } = useDeleteOrg();
  const { mutate: mutateLeave, isPending: leaving } = useLeaveOrg();

  // const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [isLeaveOpen, setLeaveOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const onConfirm = () => {
    mutate(data);
  };

  return (
    <>
      {/* Update Sheet */}
      {/* <UpdateNurserySheet
        open={isUpdateOpen}
        setOpen={setUpdateOpen}
        updateNurseryId={data.id}
      /> */}

      {/* Alert Dialog */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete created
              organization and remove data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={onConfirm}
                loading={isPending}
                disabled={isPending}
                icon={<TrashIcon className="size-4" />}
              >
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alert Dialog */}
      <AlertDialog open={isLeaveOpen} onOpenChange={setLeaveOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {`You'll be left from the selected organization.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={() =>
                  mutateLeave({ email: sessionData?.user?.email || "" })
                }
                loading={leaving}
                disabled={leaving}
                icon={<TrashIcon className="size-4" />}
              >
                Leave
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          {sessionData?.user?.role === "admin" ? (
            <>
              {/* Update Sheet */}
              {/* <DropdownMenuItem onClick={() => setUpdateOpen(true)}>
                <Edit className="mr-2 h-4 w-4" /> Update
              </DropdownMenuItem> */}

              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem onClick={() => setLeaveOpen(true)}>
              <LogOut className="mr-2 h-4 w-4" /> Leave
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
