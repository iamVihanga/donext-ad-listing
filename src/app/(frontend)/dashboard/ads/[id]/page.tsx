import React from "react";

type Props = {
  params: { id: string };
};

export default function SingleAdPage({ params }: Props) {
  return <div>SingleAdPage - {params.id}</div>;
}
