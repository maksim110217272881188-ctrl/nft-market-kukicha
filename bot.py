import os
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
)

logging.basicConfig(level=logging.INFO)

BOT_TOKEN = os.getenv("BOT_TOKEN")
MARKET_URL = (
    "https://maksim110217272881188-ctrl.github.io/"
    "nft-market-kukicha/"
)


async def start(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE,
):
    keyboard = [
        [
            InlineKeyboardButton(
                "🛍 Открыть маркет",
                url=MARKET_URL,
            )
        ]
    ]

    await update.message.reply_text(
        "🔥 Добро пожаловать в NFT MARKET KUKICHA!\n\n"
        "Здесь ты сможешь просматривать коллекции "
        "и изучать предметы.\n\n"
        "Маркетплейс пока работает в деморежиме.",
        reply_markup=InlineKeyboardMarkup(keyboard),
    )


def main():
    if not BOT_TOKEN:
        raise RuntimeError(
            "Добавь токен в переменную окружения BOT_TOKEN"
        )

    app = Application.builder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))

    print("NFT MARKET KUKICHA bot is running!")
    app.run_polling()


if __name__ == "__main__":
    main()
