declare module 'splitting' {
  interface SplittingResult {
    chars: HTMLElement[]
    words: HTMLElement[]
    el: HTMLElement
  }
  interface SplittingOptions {
    target?: Element | null
    by?: string
    key?: string | null
    whitespace?: boolean
  }
  function splitting(options?: SplittingOptions): SplittingResult[]
  export default splitting
}

declare module 'splitting/dist/splitting.css' {
  const styles: Record<string, string>
  export default styles
}
