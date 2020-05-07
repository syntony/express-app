export default class HookahService {
  static getHookahsSubsets = ({ hookahs, guestsNumber }) => {
    // even or odd
    const target = !(guestsNumber % 2) ? guestsNumber : guestsNumber + 1

    // filter out all items larger than target
    let hks = hookahs.filter(({ pipes }) => pipes <= target)

    function fork(i = 0, s = 0, t = []) {
      if (s === target) {
        result.push(t)
        return
      }
      if (i === hks.length) {
        return
      }
      if (s + hks[i].pipes <= target) {
        // shout circuit for positive numbers only
        fork(i + 1, s + hks[i].pipes, t.concat(hks[i]))
      }
      fork(i + 1, s, t)
    }

    let result = []
    fork()
    return result
  }
}
