const { VERBOSE } = process.env

export default function verboseConsoleLog(name, data) {
  if (VERBOSE) console.log(`🚀 ~ ${name}`, data)
}
