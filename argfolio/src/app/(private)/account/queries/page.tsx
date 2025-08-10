import { fetchQueriesOfUser } from "@/actions/queries";
import { getCurrentUser } from "@/actions/users";
import { IQuery } from "@/interfaces";
import dayjs from "dayjs";
import React from "react";

async function QueriesPage() {
  const userResponse: any = await getCurrentUser();
  if (!userResponse.success) {
    return <div>Failed to load user data</div>;
  }

  const queriesResponse: any = await fetchQueriesOfUser(
    userResponse?.data?.id!
  );
  if (!queriesResponse.success) {
    return <div>Failed to load queries</div>;
  }

  const queries: IQuery[] = queriesResponse.data;
  return (
    <div>
      <h1 className="text-xl font-bold">Queries</h1>

      <div className="mt-5">
        {queries.length === 0 ? (
          <div className="p-3 border border-gray-300 bg-gray-100 text-sm">
            No queries found
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {queries.map((query) => (
              <div
                className="border border-gray-300 p-3 rounded-lg flex flex-col gap-2"
                key={query.id}
              >
                <h1 className="text-sm font-semibold">
                  {query.name} - {query.email}
                </h1>
                <p className="text-sm">{query.message}</p>

                <div className="flex justify-end">
                  <span className="text-xs text-gray-500">
                    {dayjs(query.created_at).format("MMM DD, YYYY hh:mm A")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default QueriesPage;