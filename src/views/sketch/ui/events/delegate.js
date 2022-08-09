export function eventDelegate(
  parent,
  type,
  target,
  listener,
  options
) {
  if (typeof parent === 'string') {
    document.querySelectorAll(parent).forEach(
      el => el.addEventListener(type, wrappedListener)
    )
    return
  }
  parent.addEventListener(type, wrappedListener)
  function wrappedListener(event) {
    let targetElement = event.target
    const parentElement = event.currentTarget
    while (targetElement !== parentElement) {
      if (targetElement.matches(target)) {
        listener.call(targetElement, ...arguments)
        return
      }
      targetElement = targetElement.parentElement
    }
  }
}
