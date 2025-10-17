import { useEffect, useRef, useState } from "react";
import { addNewItemsToOrder, addNewOrderInfo } from "../../shared/api/orders";
import { useAppSelector } from "../../app/hooks";
import { nextIntId } from "../../shared/lib/generatorId";
import type { AddItemsType, AddOrdersType } from "../../entities/orders/types";

type ModalConfirmOrderProps = {
  total: string;
  onClose: () => void;
  onSuccess?: (receiptId: string) => void;
};

function luhnCheck(num: string) {
  const s = num.replace(/\s+/g, "");
  if (!/^\d{12,19}$/.test(s)) return false;
  let sum = 0;
  let dbl = false;
  for (let i = s.length - 1; i >= 0; i--) {
    let d = parseInt(s[i], 10);
    if (dbl) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    dbl = !dbl;
  }
  return sum % 10 === 0;
}

export default function ModalConfirmOrder({
  total,
  onClose,
  onSuccess,
}: ModalConfirmOrderProps) {
  const [card, setCard] = useState("4242 4242 4242 4242");
  const [exp, setExp] = useState("12/29");
  const [cvv, setCvv] = useState("123");
  const [name, setName] = useState("JOHN DOE");
  const [agree, setAgree] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ id: string } | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const { cart } = useAppSelector((state) => state.cart);

  // close ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !processing) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [processing, onClose]);

  // masks
  function formatCard(input: string) {
    return input
      .replace(/\D/g, "")
      .slice(0, 19)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }
  function formatExp(input: string) {
    const digits = input.replace(/\D/g, "").slice(0, 4);
    if (digits.length < 3) return digits;
    return digits.slice(0, 2) + "/" + digits.slice(2);
  }

  function validate(): string | null {
    if (!agree) return "Please confirm this is a DEMO payment.";
    if (!name.trim()) return "Cardholder name is required.";
    const cardDigits = card.replace(/\s+/g, "");
    if (!luhnCheck(cardDigits))
      return "Card number looks invalid (Luhn check failed).";
    const [mm, yy] = exp.split("/");
    if (!mm || !yy || mm.length !== 2 || yy.length !== 2)
      return "Expiry must be MM/YY.";
    const m = Number(mm),
      y = Number("20" + yy);
    if (m < 1 || m > 12) return "Expiry month must be 01–12.";
    const now = new Date();
    const expDate = new Date(y, m, 0);
    if (expDate < new Date(now.getFullYear(), now.getMonth(), 1))
      return "Card is expired.";
    if (!/^\d{3,4}$/.test(cvv)) return "CVV must be 3–4 digits.";
    return null;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setProcessing(true);

    // Fake logic: "test cards"
    // 4242 4242 4242 4242 => success
    // 4000 0000 0000 0002 => rejection
    const digits = card.replace(/\s+/g, "");
    const fail = digits.endsWith("0002");

    await new Promise((r) => setTimeout(r, 1200));

    setProcessing(false);
    if (fail) {
      setError(
        "Payment was declined in DEMO mode. Try another test number (e.g. 4242 4242 4242 4242)."
      );
    } else {
      const receiptId = Math.random().toString(36).slice(2, 10).toUpperCase();
      setDone({ id: receiptId });
      onSuccess?.(receiptId);

      try {
        const idItems = nextIntId();

        const order: AddOrdersType = {
          id: idItems + 1,
          status: "new",
          customer_name: name,
        };

        const items: AddItemsType[] = cart.map(
          (item): AddItemsType => ({
            id: idItems + item.id,
            order_id: order.id,
            name: item.name,
            qty: item.quantity,
            status: "cooking",
            receipt_number: receiptId,
          })
        );

        await addNewOrderInfo(order);
        await addNewItemsToOrder(items);
      } catch {
        setError("Failed to create order");
      }
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="demo-payment-title"
      ref={dialogRef}
    >
      <div className="w-full max-w-md rounded-md bg-white p-5 shadow-xl">
        {done ? (
          <div className="space-y-4 text-center">
            <div className="text-green-600 text-2xl font-semibold">Paid</div>
            <div className="">
              Your order will be ready in 30-60 minutes. You can pick it up at
              6007 Bay Parkway Brooklyn, NY 11204.
            </div>
            <div className=" text-red-700">
              <div className="mb-5">
                Please use the <strong>receipt number</strong> to confirm your
                order or give
                <strong> your name</strong> at the restaurant. Receipt:{" "}
                <strong className="font-mono">{done.id}</strong>
              </div>
            </div>
            <p className="text-lg font-medium">Total: {total}</p>
            <button
              onClick={onClose}
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 id="demo-payment-title" className="text-lg font-semibold">
                Checkout
              </h2>
              <button
                type="button"
                onClick={onClose}
                disabled={processing}
                className="rounded-lg px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Cardholder name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                placeholder="JOHN DOE"
                autoComplete="cc-name"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Card number
              </label>
              <input
                inputMode="numeric"
                value={card}
                onChange={(e) => setCard(formatCard(e.target.value))}
                className="w-full rounded-md border px-3 py-2 font-mono outline-none focus:ring-2 focus:ring-black"
                placeholder="4242 4242 4242 4242"
                defaultValue="4242 4242 4242 4242"
                autoComplete="cc-number"
                aria-describedby="card-hint"
              />
              <p id="card-hint" className="mt-1 text-xs text-gray-500">
                Try success: 4242 4242 4242 4242 • Decline: **** **** **** 0002
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Expiry (MM/YY)
                </label>
                <input
                  inputMode="numeric"
                  value={exp}
                  onChange={(e) => setExp(formatExp(e.target.value))}
                  className="w-full rounded-md border px-3 py-2 font-mono outline-none focus:ring-2 focus:ring-black"
                  placeholder="12/29"
                  defaultValue="12/29"
                  autoComplete="cc-exp"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">CVV</label>
                <input
                  inputMode="numeric"
                  value={cvv}
                  onChange={(e) =>
                    setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                  className="w-full rounded-md border px-3 py-2 font-mono outline-none focus:ring-2 focus:ring-black"
                  placeholder="123"
                  defaultValue="123"
                  autoComplete="cc-csc"
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                id="agree"
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="agree" className="text-sm text-gray-700">
                I understand this is a <strong>DEMO</strong> and no real payment
                will be processed.
              </label>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={processing}
              className="flex w-full items-center justify-center  bg-black   px-4 py-2 font-medium text-white disabled:opacity-60"
            >
              {processing ? "Processing…" : `Pay ${total}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
