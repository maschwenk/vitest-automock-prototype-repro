import { setInterval } from 'node:timers/promises'
import { expect, test, vi } from 'vitest'

vi.mock(import('node:timers/promises'))

test('mocking does not change the real setInterval', async () => {
  vi.mocked(setInterval).mockReset()

  const actual = await vi.importActual('node:timers/promises')
  for await (const _ of actual.setInterval(1)) break
})

test('vi.mockObject does not change the original', () => {
  async function* gen() {}
  const parent = Object.getPrototypeOf(gen.prototype)

  vi.mockObject({ gen }).gen.mockReset()

  expect(Object.getPrototypeOf(gen.prototype)).toBe(parent)
})
