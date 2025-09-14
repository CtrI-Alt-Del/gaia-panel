import { Form, Link, useLoaderData } from "react-router";
import type { Route } from "../+types/root";
import { TelemetryService } from "@/rest/services/telemetry-service";
import type { ParameterDto } from "@/core/dtos/ParameterDto";
import { ParametersPage } from "@/ui/telemetry/widgets/pages/parameters/parameters-page";

type LoaderData = {
  items: ParameterDto[];
  nextCursor: string | null;
  prevCursor: string | null;
  limit: number;
  q: string;
};

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const limit = Math.max(1, Math.min(100, Number(url.searchParams.get("limit") ?? "10")));
  const cursor = url.searchParams.get("cursor");

  const resp = await TelemetryService.listParameters({ q, limit, cursor });
  if (resp.isFailure) {
    throw new Response(resp.errorMessage, { status: resp.statusCode });
  }

  return resp.body as LoaderData;
}

export default function Parameters() {
  const data = useLoaderData<LoaderData>();
  return <ParametersPage {...data} />;
}
