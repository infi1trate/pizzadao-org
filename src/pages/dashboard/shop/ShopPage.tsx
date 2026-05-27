import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Window from "../components/Window";
import ItemHero from "./ItemHero";
import {
  CATEGORY_TABS,
  ME_BALANCE,
  endsInLabel,
  filterByTab,
  getItems,
  stockLabel,
  type CategoryTab,
  type ShopItem,
} from "./shopData";

/**
 * /dashboard/shop — spend $PEP.
 *
 * Balance pinned top-right (echoes the status strip). Five tabs across
 * the top, then a window-chrome grid of item cards. Vintage corner-
 * store crossed with gachapon — warm, slightly cluttered, items have
 * personality.
 */
const ShopPage = () => {
  const [tab, setTab] = useState<CategoryTab>("all");
  const balance = ME_BALANCE;

  const items = useMemo(() => filterByTab(getItems(), tab), [tab]);

  return (
    <section className="animate-fade-in pb-28 md:pb-0">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-[60ch]">
          <p className="ui text-[11px] uppercase tracking-[0.22em] text-tomato">
            § Shop
          </p>
          <h1 className="font-display mt-2 text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[0.94] tracking-tight">
            The <span className="handwritten text-tomato">corner store</span>.
          </h1>
          <p className="mt-3 text-[16px] leading-relaxed text-ink/70">
            Spend your pepperoni on pizza, drops, and perks.
          </p>
        </div>

        <BalanceChip balance={balance} />
      </header>

      {/* tabs */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        {CATEGORY_TABS.map((t) => {
          const on = tab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={
                "ui inline-flex items-center whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors " +
                (on
                  ? "bg-ink text-cream"
                  : "bg-paper text-ink/65 ring-1 ring-ink/10 hover:bg-cream hover:text-ink")
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* grid */}
      {items.length === 0 ? (
        <EmptyCategory balance={balance} />
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} balance={balance} />
          ))}
        </div>
      )}

      {balance === 0 && (
        <Window label="Heads up" sticker="🍕" tone="butter" className="mt-8">
          <p className="text-[14.5px] text-ink/80">
            You&rsquo;ve got 0 $PEP. Earn some first — try a{" "}
            <Link to="/dashboard/bounties" className="font-semibold underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
              bounty
            </Link>{" "}
            or finish a mission on the{" "}
            <Link to="/dashboard/path" className="font-semibold underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
              Path
            </Link>
            .
          </p>
        </Window>
      )}
    </section>
  );
};

// ---------------------------------------------------------------------------

const BalanceChip = ({ balance }: { balance: number }) => (
  <div className="inline-flex items-center gap-3 rounded-2xl bg-butter px-4 py-3 ring-1 ring-ink/15 shadow-[0_1px_2px_hsl(30_20%_12%/0.06),0_10px_22px_-14px_hsl(30_20%_12%/0.22)]">
    <span
      aria-hidden
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream text-[18px] ring-1 ring-ink/10"
    >
      🍕
    </span>
    <div>
      <p className="ui text-[10.5px] uppercase tracking-[0.18em] text-ink/60">
        § Your balance
      </p>
      <p className="font-display text-[1.5rem] font-extrabold leading-none tracking-tight text-ink">
        {balance.toLocaleString()}{" "}
        <span className="ui text-[11px] font-bold uppercase tracking-[0.18em] text-ink/55">
          $PEP
        </span>
      </p>
    </div>
  </div>
);

// ---------------------------------------------------------------------------

const ItemCard = ({
  item,
  balance,
}: {
  item: ShopItem;
  balance: number;
}) => {
  const soldOut = item.stock === 0;
  const canAfford = balance >= item.pricePep;
  const stock = stockLabel(item);

  let ctaLabel = "Redeem";
  let ctaClass = "bg-tomato text-cream hover:bg-tomato-deep";
  if (soldOut) {
    ctaLabel = "Sold out";
    ctaClass = "bg-ink/[0.07] text-ink/45 pointer-events-none";
  } else if (!canAfford) {
    ctaLabel = `Need ${item.pricePep - balance} more $PEP`;
    ctaClass = "bg-ink/[0.07] text-ink/55 pointer-events-none";
  }

  return (
    <Window
      label={item.category[0].toUpperCase() + item.category.slice(1)}
      sticker={item.limited ? "★" : "·"}
      bodyClassName="p-4 md:p-5"
    >
      <Link to={`/dashboard/shop/${item.id}`} className="block">
        <ItemHero item={item} />
      </Link>

      <h3 className="font-display mt-4 text-[1.15rem] font-bold leading-tight tracking-tight text-ink">
        <Link to={`/dashboard/shop/${item.id}`}>{item.name}</Link>
      </h3>
      <p className="mt-1 line-clamp-2 text-[13.5px] leading-snug text-ink/70">
        {item.blurb}
      </p>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="inline-flex items-baseline gap-1">
          <span className="font-display text-[1.6rem] font-extrabold leading-none tracking-tight text-tomato">
            {item.pricePep.toLocaleString()}
          </span>
          <span className="ui text-[11px] font-bold uppercase tracking-[0.18em] text-ink/55">
            $PEP
          </span>
        </span>
        <span
          className={
            "ui text-[11px] uppercase tracking-[0.16em] " +
            (soldOut
              ? "text-ink/40"
              : item.stock !== null && item.stock <= 5
                ? "text-tomato"
                : "text-ink/55")
          }
        >
          {stock}
        </span>
      </div>

      {item.limited && item.endsAt && (
        <p className="ui mt-1 text-[11px] uppercase tracking-[0.16em] text-tomato">
          {endsInLabel(item.endsAt)}
        </p>
      )}

      <Link
        to={`/dashboard/shop/${item.id}`}
        className={
          "ui mt-4 inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-[12.5px] font-semibold transition-colors " +
          ctaClass
        }
      >
        <span className="whitespace-nowrap">{ctaLabel}</span>
      </Link>
    </Window>
  );
};

// ---------------------------------------------------------------------------

const EmptyCategory = ({ balance }: { balance: number }) => (
  <Window label="Empty shelf" sticker="·" tone="paper" className="mt-6">
    <p className="text-[14.5px] text-ink/70">
      Nothing here yet. New drops every Friday.
    </p>
    {balance > 0 && (
      <p className="ui mt-2 text-[12px] uppercase tracking-[0.16em] text-ink/45">
        You&rsquo;ve got {balance.toLocaleString()} $PEP waiting.
      </p>
    )}
  </Window>
);

export default ShopPage;
