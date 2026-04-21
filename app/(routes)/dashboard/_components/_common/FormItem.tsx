"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
    ActivityIcon,
    EllipsisIcon,
    Globe,
    LockKeyholeIcon,
    MessageSquare,
    Trash2,
} from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteForm } from "@/actions/form.action";
import { toast } from "@/hooks/use-toast";

type PropsType = {
    id: number;
    formId: string;
    name: string;
    responses: number;
    views: number;
    createdAt: Date;
    published: boolean;
    backgroundColor: string;
};
const FormItem = (props: PropsType) => {
    const {
        formId,
        name,
        published,
        createdAt,
        responses = 0,
        views = 0,
    } = props;

    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const onClick = useCallback(() => {
        router.push(`/dashboard/form/builder/${formId}`);
    }, [formId, router]);

    const onDelete = useCallback(async () => {
        const confirmed = window.confirm(
            `Delete "${name}"? This action cannot be undone.`
        );

        if (!confirmed || isDeleting) return;

        setIsDeleting(true);
        const response = await deleteForm(formId);
        setIsDeleting(false);

        if (response.success) {
            toast({
                title: "Success",
                description: "Form deleted successfully",
            });
            router.refresh();
            return;
        }

        toast({
            title: "Error",
            description: response.message || "Failed to delete form",
            variant: "destructive",
        });
    }, [formId, isDeleting, name, router]);
    return (
        <div onClick={onClick} role="button" className="w-full h-auto">
            <div
                className="w-full relative flex 
      items-center justify-center
      overflow-hidden h-[150px] rounded-t-xl border border-gray-300
      bg-gradient-to-b from-primary/10 to-primary/10
      "
            >
                <div
                    className=" w-36 absolute bottom-0 
                flex items-center 
        flex-col
        px-4 pt-6
        h-32 rounded-t-xl
         bg-white shadow-lg"
                >
                    <h5
                        className="text-sm font-medium mb-1 text-center
          text-gray-400 truncate block w-[200px]
          "
                    >
                        {name}
                    </h5>
                    {[0, 1, 2].map((item) => (
                        <div
                            key={item}
                            className="flex
             items-center
             gap-1 mb-2"
                        >
                            <Skeleton
                                className="h-3 w-3 
              rounded-full shrink-0"
                            />
                            <Skeleton className="h-[11px] w-[75px]" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full py-0">
                <div
                    className="flex w-full items-center
         justify-between py-1"
                >
                    <span
                        className="text-sm flex items-center gap-1 font-medium
                  "
                    >
                        {published ? (
                            <Globe className="text-muted-foreground size-3" />
                        ) : (
                            <LockKeyholeIcon className="text-muted-foreground size-3" />
                        )}
                        {name}
                    </span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1 rounded-sm hover:bg-gray-100"
                                disabled={isDeleting}
                            >
                                <EllipsisIcon className="text-gray-700 size-4" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={(e) => {
                                    e.stopPropagation();
                                    void onDelete();
                                }}
                                className="text-red-600 focus:text-red-600"
                            >
                                <Trash2 className="size-4 mr-2" />
                                Delete Form
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div
                    className="flex w-full border-t border-gray-300
        items-center justify-between py-1
        "
                >
                    <div className="flex items-center gap-2">
                        <span
                            className="text-muted-foreground flex 
                      items-center gap-1 font-[14px]"
                        >
                            {responses}
                            <MessageSquare
                                className="text-muted-foreground 
              size-[14px]"
                            />
                        </span>

                        <span
                            className="text-muted-foreground 
            flex items-center gap-1 text-[14px]"
                        >
                            {views}
                            <ActivityIcon
                                className="text-muted-foreground
               size-[14px]"
                            />
                        </span>
                    </div>
                    <span
                        className="text-muted-foreground flex
                  gap-1 text-[13px]
                  "
                    >
                        {formatDistanceToNowStrict(new Date(createdAt), {
                            addSuffix: true,
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FormItem;