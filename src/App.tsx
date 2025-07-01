import { useInfiniteQuery } from "@tanstack/react-query";
import { ThemeToggle } from "./components/theme-toggle";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import api, { type WalletMessagesResponse } from "@/api";
import { useState } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "./components/ui/table";

function App() {
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const messages = useInfiniteQuery({
    enabled: !!search,
    queryKey: ["messages", search],
    queryFn: async ({ pageParam }) => {
      return api.getMessages(search, { nextToken: pageParam });
    },
    initialPageParam: "",
    getNextPageParam: (lastPage: WalletMessagesResponse) => lastPage.nextToken,
  });

  return (
    <div className="p-10">
      <div className="flex justify-between mb-8">
        <div className="text-2xl font-extrabold">APACX</div>
        <ThemeToggle />
      </div>
      <div className="flex w-full max-w-sm items-center gap-2">
        <Input
          value={searchInput}
          onChange={(v) => {
            setSearchInput(v.target.value);
          }}
          type="address"
          placeholder="Search for Address Messages"
        />
        <Button
          className="cursor-pointer"
          onClick={() => {
            if (searchInput === search) {
              messages.refetch();
            }
            setSearch(searchInput);
          }}
          type="submit"
          variant="outline"
        >
          Search
        </Button>
      </div>
      <p className="text-sm text-destructive empty:hidden">
        {messages.error?.message}
      </p>
      <Table className="mt-10">
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Nonce</TableHead>
            <TableHead>Source Tx Hash</TableHead>
            <TableHead>From</TableHead>
            <TableHead>Destination Tx Hash</TableHead>
            <TableHead>Application</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.isLoading ? (
            <TableRow>
              <TableCell className="text-center text-zinc-400" colSpan={7}>
                Loading...
              </TableCell>
            </TableRow>
          ) : !messages.data?.pages?.length ? (
            <TableRow>
              <TableCell className="text-center text-zinc-400" colSpan={7}>
                No data yet...
              </TableCell>
            </TableRow>
          ) : (
            messages.data?.pages?.flatMap(({ data: messages }) =>
              messages.map((message) => (
                <TableRow key={message.guid}>
                  <TableCell>{message.status.name}</TableCell>
                  <TableCell>{message.pathway.nonce}</TableCell>
                  <TableCell className="truncate max-w-24">
                    {message.source.tx.txHash}
                  </TableCell>
                  <TableCell className="truncate max-w-24">
                    {message.source.tx.from}
                  </TableCell>
                  <TableCell className="truncate max-w-24">
                    {message.destination.tx?.txHash}
                  </TableCell>
                  <TableCell>
                    {message.pathway.sender?.name ||
                      message.pathway.receiver?.name}
                  </TableCell>
                  <TableCell>{message.created}</TableCell>
                </TableRow>
              ))
            )
          )}
          {messages.hasNextPage && (
            <TableRow>
              <TableCell className="text-center" colSpan={7}>
                <Button
                  className="cursor-pointer"
                  disabled={messages.isFetchingNextPage}
                  onClick={() => messages.fetchNextPage()}
                >
                  {messages.isFetchingNextPage ? "Loading..." : "Load More"}
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default App;
