"use client";

import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift, HandHeart, Utensils, Volume2, VolumeX } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const couponData = [
  {
    title: "Massage by David (30 Mins)",
    icon: HandHeart,
  },
  {
    title: "One Plate of Item7 Chicken 🍗",
    icon: Utensils,
  },
  {
    title: "One Shawarma 🌯",
    icon: Gift,
  },
];

const videoSources = ["/vid1.mp4", "/vid2.mp4", "/vid3.mp4"];
const relationshipStart = new Date(2025, 11, 14, 0, 0, 0);
const whatsappNumber = "2348162943252";
const whatsappMessage = "Baby, I saw the site. I love you so much! Happy Val's ❤️";
const dateIdeas = [
  "Sunset picnic with your favorite snacks",
  "Late-night ice cream + stargazing",
  "Cozy movie marathon + cuddles",
  "Kitchen dance party + homemade dinner",
  "Cafe date and a slow walk",
  "Sweet photoshoot + memory book",
];
const reasons = [
  "Your prayer support.",
  "Your smile.",
  "How you motivate me.",
  "Your kisses.",
  "Simply being you.",
  "Your calm heart.",
  "The way you love me.",
];

const getElapsedParts = (start: Date, end: Date) => {
  if (end.getTime() < start.getTime()) {
    return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  const monthAnchor = new Date(start);
  monthAnchor.setMonth(start.getMonth() + months);

  if (monthAnchor.getTime() > end.getTime()) {
    months -= 1;
    monthAnchor.setMonth(start.getMonth() + months);
  }

  const diffMs = end.getTime() - monthAnchor.getTime();
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { months, days, hours, minutes, seconds };
};

export default function Home() {
  const [passcode, setPasscode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [redeemed, setRedeemed] = useState<number[]>([]);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [spinRotation, setSpinRotation] = useState(0);
  const [selectedDateIdea, setSelectedDateIdea] = useState<string | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [now, setNow] = useState<Date | null>(null);
  const [hearts, setHearts] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showYesModal, setShowYesModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const heartIdRef = useRef(0);

  const isValid = passcode === "1412";

  const redeemSet = useMemo(() => new Set(redeemed), [redeemed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideoIndex((prev) => (prev + 1) % videoSources.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handlePointer = (event: PointerEvent) => {
      const id = heartIdRef.current++;
      const x = event.clientX;
      const y = event.clientY;
      setHearts((prev) => [...prev, { id, x, y }]);
      window.setTimeout(() => {
        setHearts((prev) => prev.filter((heart) => heart.id !== id));
      }, 1200);
    };

    window.addEventListener("pointerdown", handlePointer);
    return () => window.removeEventListener("pointerdown", handlePointer);
  }, []);

  const triggerConfetti = () => {
    const heart = confetti.shapeFromText({ text: "❤", scalar: 1.2 });
    confetti({
      particleCount: 120,
      spread: 70,
      startVelocity: 35,
      origin: { y: 0.7 },
      shapes: [heart],
      colors: ["#d94862", "#f7b7c7", "#fce8ed"],
    });
    confetti({
      particleCount: 90,
      spread: 120,
      startVelocity: 28,
      origin: { y: 0.5 },
      shapes: [heart],
      colors: ["#b3263f", "#f8cbd6", "#fff3f4"],
    });
  };

  const triggerRoseConfetti = () => {
    const heart = confetti.shapeFromText({ text: "❤", scalar: 1.1 });
    confetti({
      particleCount: 160,
      spread: 90,
      startVelocity: 40,
      origin: { y: 0.6 },
      shapes: [heart],
      colors: ["#ff4d6d", "#ff758f", "#ff8fa3", "#ffc2d1"],
    });
    confetti({
      particleCount: 120,
      spread: 120,
      startVelocity: 28,
      origin: { y: 0.65 },
      shapes: [heart],
      colors: ["#ff4d6d", "#ff8fa3", "#ffb3c6", "#ffd6e0"],
    });
  };

  const triggerPrideConfetti = () => {
    const heart = confetti.shapeFromText({ text: "❤", scalar: 1.2 });
    confetti({
      particleCount: 320,
      spread: 120,
      startVelocity: 55,
      origin: { y: 0.6 },
      shapes: [heart],
      colors: ["#0b5ed7", "#ffc107", "#ffffff"],
    });
    confetti({
      particleCount: 220,
      spread: 160,
      startVelocity: 40,
      origin: { y: 0.5 },
      shapes: [heart],
      colors: ["#0b5ed7", "#ffc107", "#ffffff"],
    });
  };

  const handleUnlock = () => {
    if (!isValid) return;
    setIsUnlocked(true);
    triggerConfetti();
    audioRef.current?.play().catch(() => undefined);
  };

  const toggleAudio = () => {
    setIsAudioMuted((prev) => {
      const next = !prev;
      const audio = audioRef.current;
      if (audio) {
        audio.muted = next;
        if (!next) {
          audio.play().catch(() => undefined);
        }
      }
      return next;
    });
  };

  const toggleRedeem = (index: number) => {
    setRedeemed((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const handleSpinBottle = () => {
    const randomIndex = Math.floor(Math.random() * dateIdeas.length);
    const extraTurns = 360 * 3;
    const randomSpin = Math.floor(Math.random() * 360);
    setSpinRotation((prev) => prev + extraTurns + randomSpin);
    setSelectedDateIdea(dateIdeas[randomIndex]);
  };

  const elapsed = useMemo(
    () => (now ? getElapsedParts(relationshipStart, now) : null),
    [now]
  );

  const whatsappLink = useMemo(
    () =>
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`,
    []
  );

  const moveNoButton = () => {
    if (typeof window === "undefined") return;
    const maxX = Math.max(0, window.innerWidth - 180);
    const maxY = Math.max(0, window.innerHeight - 240);
    const x = Math.floor(Math.random() * maxX) - maxX / 2;
    const y = Math.floor(Math.random() * maxY) - maxY / 2;
    setNoPosition({ x, y });
  };

  const handleYesClick = () => {
    triggerPrideConfetti();
    setShowYesModal(true);
  };

  return (
    <div className="relative min-h-screen text-[#fff3f4]">
      <audio
        ref={audioRef}
        src="/miamor.mp3"
        loop
        preload="auto"
        muted={isAudioMuted}
      />

      <div className="pointer-events-none fixed inset-0 h-full w-full -z-10">
        <AnimatePresence initial={false} mode="sync">
          <motion.video
            key={videoSources[activeVideoIndex]}
            className="absolute inset-0 h-full w-full object-cover"
            src={videoSources[activeVideoIndex]}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/60" />
        <div className="cinematic-grain absolute inset-0" />
        <div className="cinematic-vignette absolute inset-0" />
      </div>

      <div className="pointer-events-none fixed inset-0 z-40">
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.span
              key={heart.id}
              className="absolute text-2xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.45)]"
              style={{ left: heart.x - 12, top: heart.y - 12 }}
              initial={{ opacity: 1, scale: 0, y: 0 }}
              animate={{ opacity: 0, scale: 1, y: -60 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              💖
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-[#4a0f1b] via-[#6a1121] to-[#8d1b32] px-6"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 text-center text-white shadow-2xl backdrop-blur">
              <p className="font-playfair text-sm uppercase tracking-[0.3em] text-white/70">
                The Key To Us
              </p>
              <h1 className="mt-3 font-playfair text-2xl font-semibold">
                Enter the day our story began (DDMM)
              </h1>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={passcode}
                onChange={(event) => setPasscode(event.target.value)}
                className="mt-6 w-full rounded-2xl border border-white/30 bg-white/20 px-4 py-3 text-center text-xl tracking-[0.5em] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/60"
                placeholder="DDMM"
              />
              <button
                type="button"
                onClick={handleUnlock}
                disabled={!isValid}
                className="mt-6 w-full rounded-full bg-white py-3 text-base font-semibold text-[#6a1121] transition duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Unlock Our Story
              </button>
              <p className="mt-4 text-xs text-white/60">
                Hint: The day my world changed forever.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="text-shadow relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-24 px-6 pb-24 pt-20 sm:px-10">
        <section className="relative flex flex-col items-center text-center">
          <motion.div
            className="absolute -top-10 h-52 w-52 rounded-full bg-[#fbd4de] blur-3xl"
            animate={{
              opacity: [0.5, 0.9, 0.5],
              scale: [0.94, 1.06, 0.94],
              x: [0, 12, -8, 0],
              y: [0, -10, 8, 0],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6 rounded-3xl border border-white/20 bg-black/40 px-8 py-10 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          >
            <h1 className="font-playfair shimmer-text text-4xl font-semibold text-[#fff3f4] sm:text-5xl">
              Happy Valentine&apos;s Day, Okiki ❤️
            </h1>
            <p className="max-w-2xl text-lg text-white/80 sm:text-xl">
              My love, my happiness, my everything.
            </p>
            <button
              type="button"
              onClick={triggerRoseConfetti}
              className="rounded-full bg-white/90 px-6 py-3 text-base font-semibold text-[#6a1121] transition hover:scale-[1.02]"
            >
              Accept Flowers 🌹
            </button>
            <motion.div
              className="relative mt-6 flex h-36 w-36 items-center justify-center"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 rounded-full bg-[#f8cbd6] blur-2xl opacity-70" />
              <div className="text-7xl">❤️</div>
            </motion.div>
          </motion.div>
        </section>

        <section className="flex flex-col items-center">
          <div className="w-full max-w-3xl rounded-3xl border border-white/20 bg-black/40 px-8 py-8 text-center shadow-xl backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              Since 14 Dec 2025
            </p>
            <h2 className="mt-3 font-playfair text-2xl text-[#fff3f4] sm:text-3xl">
              Loving you for:
            </h2>
            <p
              className="mt-4 text-lg text-white/85 sm:text-xl"
              aria-live="polite"
              suppressHydrationWarning
            >
              {elapsed
                ? `${elapsed.months} Months, ${elapsed.days} Days, ${elapsed.hours} Hours, ${elapsed.minutes} Minutes, ${elapsed.seconds} Seconds`
                : "Loading time together..."}
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="mx-auto w-full max-w-2xl rounded-3xl border border-white/20 bg-black/40 px-6 py-5 text-center backdrop-blur-sm">
            <h2 className="font-playfair shimmer-text text-3xl text-[#fff3f4]">
              Why You?
            </h2>
            <p className="mt-2 text-base text-white/75">
              Little reasons my heart says yes every day.
            </p>
          </div>
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
            {reasons.map((reason) => (
              <div
                key={reason}
                className="min-w-[240px] snap-center rounded-3xl border border-white/20 bg-black/40 px-6 py-6 text-center backdrop-blur-md sm:min-w-[280px]"
              >
                <p className="font-playfair text-lg text-white/90">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col items-center">
          <motion.div
            className="max-w-3xl rounded-3xl border border-white/20 bg-black/40 px-8 py-10 text-center shadow-xl backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <h2 className="font-playfair shimmer-text text-3xl text-[#fff3f4]">
              Love Letter
            </h2>
            <p className="font-dancing mt-6 whitespace-pre-line text-xl leading-relaxed text-white/85 sm:text-2xl">
              {`My Dearest Okiki,
Since December 14th, my world has completely changed. You didn’t just walk into my life; you brought a light that I never knew I was missing.
You are my peace, my joy, and my greatest blessing. Every day with you feels like a gift. Thank you for being my rock, for understanding me without words, and for making life so incredibly beautiful.
I love you, completely and endlessly.

Forever yours,
David.`}
            </p>
          </motion.div>
        </section>

        <div className="section-divider" aria-hidden="true">
          <span>❤</span>
        </div>

        <section className="flex flex-col items-center gap-6">
          <div className="mx-auto w-full max-w-2xl rounded-3xl border border-white/20 bg-black/40 px-6 py-5 text-center backdrop-blur-sm">
            <h2 className="font-playfair shimmer-text text-3xl text-[#fff3f4]">
              Spin The Bottle Date
            </h2>
            <p className="mt-2 text-base text-white/75">
              Tap to pick our next little adventure.
            </p>
          </div>
          <div className="w-full max-w-2xl rounded-3xl border border-white/20 bg-black/40 px-8 py-10 text-center shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex flex-col items-center gap-6">
              <button
                type="button"
                onClick={handleSpinBottle}
                className="relative flex h-44 w-44 items-center justify-center rounded-full border border-white/20 bg-white/5 transition hover:scale-[1.02]"
                aria-label="Spin the bottle to choose a date"
              >
                <div className="absolute -top-3 h-6 w-6 rounded-full bg-white/80 text-[#6a1121] shadow-md">
                  <span className="relative -top-px">❤</span>
                </div>
                <motion.div
                  className="text-6xl"
                  animate={{ rotate: spinRotation }}
                  transition={{ duration: 1.6, ease: "easeInOut" }}
                >
                  🍾
                </motion.div>
              </button>
              <button
                type="button"
                onClick={handleSpinBottle}
                className="rounded-full bg-white/90 px-6 py-3 text-base font-semibold text-[#6a1121] transition hover:scale-[1.02]"
              >
                Spin the bottle
              </button>
              <AnimatePresence mode="wait">
                {selectedDateIdea ? (
                  <motion.p
                    key={selectedDateIdea}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5 }}
                    className="font-playfair text-xl text-white"
                  >
                    {selectedDateIdea}
                  </motion.p>
                ) : (
                  <motion.p
                    key="spin-placeholder"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5 }}
                    className="text-white/70"
                  >
                    Spin to reveal our next date.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true">
          <span>❤</span>
        </div>

        <section className="flex flex-col gap-6">
          <div className="mx-auto w-full max-w-2xl rounded-3xl border border-white/20 bg-black/40 px-6 py-5 text-center backdrop-blur-sm">
            <h2 className="font-playfair shimmer-text text-3xl text-[#fff3f4]">
              Just For You
            </h2>
            <p className="mt-2 text-base text-white/75">
              Tap a ticket whenever you want to redeem it.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {couponData.map((coupon, index) => {
              const Icon = coupon.icon;
              const isRedeemed = redeemSet.has(index);
              return (
                <button
                  key={coupon.title}
                  type="button"
                  onClick={() => toggleRedeem(index)}
                  className={`ticket text-left text-white transition-transform duration-300 hover:-translate-y-1 ${
                    isRedeemed ? "redeemed" : ""
                  }`}
                >
                  <div className="ticket-inner">
                    <div className="ticket-face front">
                      <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white">
                          <Icon className="h-6 w-6" />
                        </span>
                        <p className="font-playfair text-lg text-white">
                          {coupon.title}
                        </p>
                      </div>
                      <p className="text-sm text-white/70">
                        Click to redeem.
                      </p>
                    </div>
                    <div className="ticket-face back">
                      <p className="font-playfair text-lg text-[#fff3f4]">
                        Redeemed! Send screenshot to David.
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col items-center gap-6">
          <div className="mx-auto w-full max-w-3xl rounded-3xl border border-white/20 bg-black/40 px-8 py-10 text-center shadow-xl backdrop-blur-sm">
            <h2 className="font-playfair text-2xl text-[#fff3f4] sm:text-3xl">
              One last thing... Will you be my Valentine? 🥺
            </h2>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleYesClick}
                className="rounded-full bg-white/90 px-6 py-3 text-base font-semibold text-[#6a1121] transition hover:scale-[1.05]"
              >
                YES
              </button>
              <motion.button
                type="button"
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                animate={{ x: noPosition.x, y: noPosition.y }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-base font-semibold text-white"
              >
                NO
              </motion.button>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center">
          <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-[#14161a] px-6 py-6 shadow-xl">
            <pre className="font-mono text-sm text-green-300">
{`## Changelog
- v1.0 (Dec 14): Initial Release (Met You).
- v2.0: Patched 'Loneliness' bug.
- v3.0: Added 'Kisses Addiction' feature.
- Status: Deploying Love 24/7...`}
            </pre>
          </div>
        </section>

        <footer className="text-center text-sm text-white/60">
          Coded with <span className="heart-pulse inline-block">❤️</span> by
          Babydesign
        </footer>
      </main>

      <button
        type="button"
        onClick={toggleAudio}
        className={`fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white shadow-xl backdrop-blur-sm transition hover:scale-[1.05] ${
          isAudioMuted ? "animate-pulse" : ""
        }`}
        aria-label={isAudioMuted ? "Unmute music" : "Mute music"}
      >
        {isAudioMuted ? (
          <VolumeX className="h-6 w-6" />
        ) : (
          <Volume2 className="h-6 w-6" />
        )}
      </button>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white shadow-xl backdrop-blur-sm transition hover:scale-[1.05]"
        aria-label="Send love on WhatsApp"
      >
        <span className="text-xl">💚</span>
      </a>

      <AnimatePresence>
        {showYesModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-sm rounded-3xl border border-white/20 bg-black/70 p-8 text-center text-white shadow-2xl backdrop-blur-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-playfair text-2xl">I knew it! ❤️</h3>
              <button
                type="button"
                onClick={() => setShowYesModal(false)}
                className="mt-6 rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-[#6a1121]"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
