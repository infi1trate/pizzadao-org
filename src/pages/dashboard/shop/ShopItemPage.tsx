import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, Share2, X as XIcon } from "lucide-react";
import { toast } from "sonner";
import Window from "../components/Window";
import ItemHero from "./ItemHero";
import {
  ME_BALANCE,
  endsInLabel,
  getItem,
  stockLabel,
  type ShopItem,
} from "./shopData";

/**
 * /dashboard/shop/:id — single shop item.
 *
 * Hero, price, stock, redemption details, then the purchase flow:
 *   browse → "Redeem" → confirm modal → success state with redemption
 *   instructions + a "share what you got" CTA to X.
 *
 * Balance updates locally so the demo of "your balance will be Y" reads
 * correctly; backend redemption + balance debit lands later.
 */
const ShopItemPage = () => {
  const { id = "" } = useParams<{ id: string }>();
  const item = useMemo(() => getItem(id), [id]);

  const [balance, setBalance] = useState(ME_BALANCE);
  const [confirming, setConfirming] = useState(false);
  const [redeemed, setRedeemed] = useState<{ code: string } | null>(null);

  if (!item) {
    return (
      <section className="animate-fade-in pb-28 md:pb-0">
        <Back />
        <Window label="Item" sticker="·" tone="paper" className="mt-6">
          <p className="text-[14.5px] text-ink/65">
            That item isn&rsquo;t in the shop anymore.
          </p>
        </Window>
      </section>
    );
  }

  const soldOut = item.stock === 0;
  const canAfford = balance >= item.pricePep;

  const confirm = () => {
    setBalance((b) => b - item.pricePep);
    setRedeemed({ code: makeCode(item) });
    setConfirming(false);
    toast.success(`Redeemed: ${item.name}.`);
  };

  const share = () => {
    const text = `Just spent ${item.pricePep} $PEP on "${item.name}" from the @Pizza_DAO shop 🍕`;
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="animate-fade-in pb-28 md:pb-0">
      <Back />

      <div className="mt-4 grid gap-6 md:grid-cols-3">
        {/* Left: hero + description */}
        <div className="space-y-6 md:col-span-2">
          <Window
            label={item.category[0].toUpperCase() + item.category.slice(1)}
            sticker={item.limited ? "★" : "·"}
            bodyClassName="p-5 md:p-6"
          >
            <ItemHero item={item} size="detail" />

            <h1 className="font-display mt-5 text-[clamp(1.75rem,3.6vw,2.25rem)] font-extrabold leading-[1.04] tracking-tight">
              {item.name}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/80">
              {item.description}
            </p>
          </Window>

          <Window label="Redemption" sticker="✶" bodyClassName="p-5">
            <p className="ui text-[11px] uppercase tracking-[0.18em] text-ink/45">
              § How this works
            </p>
            <p className="mt-2 text-[14.5px] leading-relaxed text-ink/80">
              {item.redemption.instructions}
            </p>
          </Window>
        </div>

        {/* Right: purchase rail */}
        <div className="space-y-6">
          <Window
            label="Redeem"
            sticker="🍕"
            tone={canAfford && !soldOut ? "butter" : "cream"}
            bodyClassName="p-5"
          >
            <div className="flex items-baseline justify-between">
              <span className="inline-flex items-baseline gap-1">
                <span className="font-display text-[2rem] font-extrabold leading-none tracking-tight text-tomato">
                  {item.pricePep.toLocaleString()}
                </span>
                <span className="ui text-[11px] font-bold uppercase tracking-[0.18em] text-ink/55">
                  $PEP
                </span>
              </span>
              <span
                className={
                  "ui text-[11.5px] uppercase tracking-[0.16em] " +
                  (soldOut
                    ? "text-ink/40"
                    : item.stock !== null && item.stock <= 5
                      ? "text-tomato"
                      : "text-ink/55")
                }
              >
                {stockLabel(item)}
              </span>
            </div>

            {item.limited && item.endsAt && (
              <p className="ui mt-1 text-[11px] uppercase tracking-[0.16em] text-tomato">
                {endsInLabel(item.endsAt)}
              </p>
            )}

            <div className="mt-4 flex items-center justify-between rounded-xl bg-paper/70 px-3 py-2 ring-1 ring-ink/10">
              <span className="ui text-[11px] uppercase tracking-[0.16em] text-ink/50">
                Your balance
              </span>
              <span className="font-display text-[1rem] font-bold tabular-nums">
                {balance.toLocaleString()}{" "}
                <span className="ui text-[10px] font-bold uppercase tracking-[0.18em] text-ink/55">
                  $PEP
                </span>
              </span>
            </div>

            {!redeemed && (
              <button
                type="button"
                disabled={soldOut || !canAfford}
                onClick={() => setConfirming(true)}
                className={
                  "ui mt-4 inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2.5 text-[13.5px] font-semibold transition-colors " +
                  (soldOut
                    ? "bg-ink/[0.07] text-ink/45"
                    : !canAfford
                      ? "bg-ink/[0.07] text-ink/55"
                      : "bg-tomato text-cream hover:bg-tomato-deep")
                }
              >
                <span className="whitespace-nowrap">
                  {soldOut
                    ? "Sold out"
                    : !canAfford
                      ? `Need ${item.pricePep - balance} more $PEP`
                      : "Redeem"}
                </span>
              </button>
            )}

            {redeemed && (
              <div className="mt-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-[12px] font-semibold text-emerald-700 ring-1 ring-emerald-600/30">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> Redeemed
                </div>
                <p className="ui mt-3 text-[11px] uppercase tracking-[0.16em] text-ink/50">
                  § Your code
                </p>
                <p className="font-display mt-1 select-all text-[1.25rem] font-extrabold tracking-[0.18em] text-ink">
                  {redeemed.code}
                </p>
                <p className="mt-2 text-[13px] leading-snug text-ink/70">
                  {item.redemption.instructions}
                </p>
                <button
                  type="button"
                  onClick={share}
                  className="ui mt-4 inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-4 py-2.5 text-[13px] font-semibold text-cream hover:bg-ink-soft"
                >
                  <Share2 className="h-3.5 w-3.5" strokeWidth={2} />
                  <span className="whitespace-nowrap">Share what you got</span>
                </button>
              </div>
            )}
          </Window>
        </div>
      </div>

      {confirming && (
        <ConfirmModal
          item={item}
          balanceAfter={balance - item.pricePep}
          onCancel={() => setConfirming(false)}
          onConfirm={confirm}
        />
      )}
    </section>
  );
};

const Back = () => (
  <Link
    to="/dashboard/shop"
    className="ui inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.18em] text-ink/55 hover:text-ink"
  >
    <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
    Back to the shop
  </Link>
);

// ---------------------------------------------------------------------------

const ConfirmModal = ({
  item,
  balanceAfter,
  onCancel,
  onConfirm,
}: {
  item: ShopItem;
  balanceAfter: number;
  onCancel: () => void;
  onConfirm: () => void;
}) => (
  <div
    className="fixed inset-0 z-50 flex items-end justify-center bg-ink/45 p-3 backdrop-blur-sm md:items-center md:p-6"
    onClick={onCancel}
  >
    <div
      className="relative w-full max-w-md"
      onClick={(e) => e.stopPropagation()}
    >
      <Window
        label="Confirm redemption"
        sticker="🍕"
        bodyClassName="p-5 md:p-6"
      >
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close"
          className="absolute right-4 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/50 hover:bg-ink/[0.06] hover:text-ink"
        >
          <XIcon className="h-4 w-4" strokeWidth={2} />
        </button>

        <p className="font-display text-[1.25rem] font-bold leading-snug tracking-tight">
          Spend {item.pricePep.toLocaleString()} $PEP for {item.name}?
        </p>
        <p className="mt-2 text-[14px] text-ink/70">
          Your balance will be{" "}
          <span className="font-semibold text-ink">
            {balanceAfter.toLocaleString()} $PEP
          </span>{" "}
          after this.
        </p>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onConfirm}
            className="ui inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-tomato px-3 py-2.5 text-[13px] font-semibold text-cream hover:bg-tomato-deep"
          >
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            <span className="whitespace-nowrap">Yes, redeem</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="ui inline-flex items-center justify-center whitespace-nowrap rounded-full bg-paper px-3 py-2.5 text-[13px] font-semibold text-ink/70 ring-1 ring-ink/10 hover:text-ink"
          >
            Not yet
          </button>
        </div>
      </Window>
    </div>
  </div>
);

// ---------------------------------------------------------------------------

function makeCode(item: ShopItem): string {
  const prefix = item.category.slice(0, 3).toUpperCase();
  const seg = () =>
    Math.random().toString(36).slice(2, 6).toUpperCase().replace(/[O0]/g, "X");
  return `${prefix}-${seg()}-${seg()}`;
}

export default ShopItemPage;
