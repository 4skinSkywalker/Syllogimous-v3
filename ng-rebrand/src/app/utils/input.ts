export function enforceMinMax(el: HTMLInputElement, minOverride?: number, maxOverride?: number) {

  const min = (minOverride !== undefined) ? minOverride : parseFloat(el.min);
  const max = (maxOverride !== undefined) ? maxOverride : parseFloat(el.max);

  if (el.value !== "") {

    if (parseFloat(el.value) < min)
      el.value = min.toString();

    if (parseFloat(el.value) > max)
      el.value = max.toString();
  }
}