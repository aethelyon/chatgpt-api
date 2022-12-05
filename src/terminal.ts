import dotenv from 'dotenv-safe'
import { oraPromise } from 'ora'
import readline from 'readline'

import { ChatGPTAPI } from './chatgpt-api'

dotenv.config()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

/**
 * Example CLI for testing functionality.
 */
async function main() {
  const api = new ChatGPTAPI({ sessionToken: process.env.SESSION_TOKEN })
  await api.ensureAuth()

  rl.question('Enter a prompt: ', async (prompt) => {
    const response = await oraPromise(api.sendMessage(prompt), {
      text: prompt
    })

    console.log(response)
    rl.close()
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
