// @flow

export const functionHandler = (func: any): ((e: any)=>void) => {
  return typeof func === "function" ? func : () => {}
}