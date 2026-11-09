# Minecraft Bedrock Chat Assistant

Asistente Virtual is an open source Minecraft Bedrock behavior pack and scripted chat assistant. It replies privately to one configured player, recognizes a small set of message topics, and changes its built-in responses according to the world's time of day.

## Install

1. Open `scripts/main.js` in a text editor and replace `YOUR_MINECRAFT_NAME` with the exact Minecraft player name, keeping the quotation marks.
2. Create a ZIP containing `manifest.json` and the `scripts` folder at the archive root.
3. Rename the ZIP file to `AsistenteVirtual.mcpack` and open it with Minecraft Bedrock.
4. In your world settings, activate the behavior pack. Enable the scripting experiment if Minecraft requests it.
5. The pack requires Minecraft Bedrock 1.20.80 or later and the `@minecraft/server` 1.13.0 module.

## Use

1. Join a world with the behavior pack active.
2. In chat, send a message starting with `!monster`, such as `!monster hello`, `!monster who are you`, `!monster help`, or `!monster goodbye`.
3. The assistant responds only to the configured player. Its preset replies are friendly during the day and more frightening at night.
4. Wait briefly between messages; the assistant applies a two-second cooldown.

The assistant uses built-in scripted replies. It does not connect to an online AI service and does not require an API key.

---

More open source project projects by EnderDevelopment: https://github.com/EnderDevelopment

Project page: https://dash.enderdevelopment.com/community/be38ad80-9c56-44ba-b5ce-8e7b3a9c5b70?utm_source=github&utm_medium=readme&utm_campaign=auto_publish&utm_content=be38ad80-9c56-44ba-b5ce-8e7b3a9c5b70
