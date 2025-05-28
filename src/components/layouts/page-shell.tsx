import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  description: string;
  actionComponent: React.ReactNode;
  logo?: string | null | undefined;
};

export function AppPageShell({
  actionComponent,
  description,
  title,
  logo
}: Props) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-4">
        {logo && (
          <Image
            src={logo}
            alt={title}
            width={100}
            height={100}
            className="size-14 rounded-md object-cover"
          />
        )}

        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-1">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      {actionComponent}
    </div>
  );
}
