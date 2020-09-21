/**
 * Return a random ID for a DOM element ensuring that it doesn't exist already
 */
export function getRandomId(): string {
  let id = `${PACKAGE_NAME}-${String(Math.random()).substr(2)}`;

  while (document.getElementById(id)) {
    id = `${PACKAGE_NAME}-${String(Math.random()).substr(2)}`;
  }

  return id;
}
