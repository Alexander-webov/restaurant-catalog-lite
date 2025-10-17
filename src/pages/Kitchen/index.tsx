import type { OrderStatus } from "../../entities/orders/types";
import {
  getOrderItemsTable,
  getOrdersTable,
  updateStatusOrder,
} from "../../shared/api/orders";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Item = {
  id: number;
  person_id: number;
  qty: number;
  name: string;
  receipt_number?: string;
};

const Kitchen = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["orders-with-items"],
    queryFn: async () => {
      const [people, items] = await Promise.all([
        getOrdersTable(),
        getOrderItemsTable(),
      ]);

      const byPerson = new Map<number, Item[]>();

      for (const it of items) {
        const key = it.order_id;
        if (!byPerson.has(key)) byPerson.set(key, []);
        byPerson.get(key)!.push(it);
      }
      return people.map((p) => ({ ...p, items: byPerson.get(p.id) ?? [] }));
    },

    staleTime: 30_000,
    refetchInterval: 3000,
    refetchOnWindowFocus: true,
  });

  const qc = useQueryClient();

  const { mutate: chageStatus } = useMutation({
    mutationFn: ({ id, status }: { id: number; status: OrderStatus }) =>
      updateStatusOrder(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders-with-items"] });
    },
  });

  const statusMono: Record<string, string> = {
    new: "bg-white text-black border border-black",
    accepted: "bg-black text-white",
    cooking: "bg-black text-white",
    ready: "bg-white text-black border border-black",
    picked_up: "bg-white text-black border border-black",
    canceled: "bg-black text-white line-through",
  };

  function hhmm(ts?: string) {
    if (!ts) return "";
    const d = new Date(ts);
    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  if (isPending) return <div className="">Loading data ...</div>;
  if (isError) return <div className="">Something went wrong ...</div>;
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 bg-white text-black">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Kitchen</h1>
        <div className="text-sm text-black/60">
          {data?.filter((el) => el.status === "new").length ?? 0} orders
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data
          ?.filter((el) => el.status === "new")
          .map((item) => {
            console.log(item);
            const badge =
              statusMono[item.status] ??
              "bg-white text-black border border-black";
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_2px_0_0_#000] hover:shadow-[0_4px_0_0_#000] transition-shadow flex flex-col justify-between"
              >
                {/* header */}
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-black/60">
                      Order #{item.id}
                    </div>
                    <div className="mt-1 truncate text-xl font-semibold">
                      {item.customer_name ?? "Guest"}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${badge}`}
                    >
                      {String(item.status).replace("_", " ")}
                    </span>
                    <span className="mt-1 text-xs text-black/60">
                      {hhmm(item.created_at)}
                    </span>
                  </div>
                </div>

                {/* items */}
                <ul className="divide-y divide-black/10">
                  {item.items.map((el) => (
                    <li
                      key={el.id}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="max-w-[70%] truncate">{el.name}</span>
                      <span className="inline-flex min-w-[2.5rem] items-center justify-center rounded-md border border-black px-2 py-0.5 text-sm font-medium">
                        ×{el.qty}
                      </span>
                    </li>
                  ))}
                  {item.items.length === 0 && (
                    <li className="py-2 text-sm text-black/60">No items</li>
                  )}
                </ul>
                <button
                  onClick={() => chageStatus({ id: item.id, status: "ready" })}
                  className="w-full mt-5 p-5 bg-slate-300"
                >
                  Ready
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Kitchen;
