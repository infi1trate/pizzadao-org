import { type ShopItem } from "./shopData";

/**
 * Hero block for a shop item. Until we have real product photos,
 * each item has a custom gradient + a single oversized sticker. Reads
 * like a vintage corner-store label — warm, slightly cluttered, with
 * the sticker doing the heavy lifting.
 *
 * `size`:
 *   - "card"   → list grid hero
 *   - "detail" → larger version on the item page
 */
const ItemHero = ({
  item,
  size = "card",
}: {
  item: ShopItem;
  size?: "card" | "detail";
}) => {
  const h = size === "detail" ? "h-64 md:h-80" : "h-40";
  const stickerSize = size === "detail" ? "text-[8rem]" : "text-[4.25rem]";

  return (
    <div
      className={
        "relative w-full overflow-hidden rounded-2xl ring-1 ring-ink/10 " + h
      }
      style={{
        backgroundImage: `linear-gradient(135deg, ${item.hero.from}, ${item.hero.to})`,
      }}
    >
      {/* paper texture wash */}
      <div className="absolute inset-0 mix-blend-multiply opacity-30 [background-image:radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.55),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(0,0,0,0.25),transparent_55%)]" />
      {/* sticker */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          aria-hidden
          className={
            "drop-shadow-[0_4px_12px_rgba(0,0,0,0.18)] " + stickerSize
          }
        >
          {item.hero.sticker}
        </span>
      </div>

      {item.limited && (
        <span
          aria-hidden
          className="handwritten absolute -right-3 -top-2 rotate-[8deg] rounded-md bg-butter px-3 py-1 text-[18px] text-ink shadow-[0_2px_6px_rgba(0,0,0,0.18)] ring-1 ring-ink/15"
        >
          Limited
        </span>
      )}
    </div>
  );
};

export default ItemHero;
