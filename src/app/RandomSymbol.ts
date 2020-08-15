import Random from "./Random";

export default class RandomSymbol extends Random {

  /**
   * Charcodes list for UTF-16 symbols, allowed for secure passwords.
   */
  static symbolsCharcodesAllowed = [
    64, 37, 43, 47, 39, 33, 35, 36, 94,
    63, 58, 46, 40, 41, 123, 125, 91, 93,
    126, 96, 45, 95, 44, 38, 42, 61, 124, 62, 60
  ];

  /**
   * Symbols list allowed for secure passwords.
   */
  static symbolsAllowedList = [
    "@", "%", "+", "/", "'", "!", "#",
    "$", "^", "?", ":", ".", "(", ")",
    "{", "}", "[", "]", "~", "`", "-",
    "_", ",", "&", "*", "=", "|", ">", "<"
  ];

  /* UTF-16 Charcodes */

  /**
   * Generates a random URF-16 charcode for specified inclusive range.
   * @param min - lower limit. Inclusive.
   * @param max - upper limit. Inclusive.
   * 
   * @static
   */
  static randCharCode(min: number, max: number): string {
    return String.fromCharCode(
      RandomSymbol.randIntInc(min, max)
    );
  }

  /**
   * Generates a random URF-16 charcodes list for specified inclusive range.
   * @param min - lower limit. Inclusive.
   * @param max - upper limit. Inclusive.
   * 
   * @static
   */
  static *randCharCodeList(min: number, max: number, length: number = 1): Generator<string> {
    const randInts = RandomSymbol.randIntIncList(length, min, max);
    for (let int of randInts) {
      yield String.fromCharCode(int);
    }
  }

  /* Digits */

  /**
   * Generates a random digit string.
   * Generation occurs from UTF-16 code, range: [48, 58).
   * 
   * @static
   */
  static randDigit(): string {
    return RandomSymbol.randCharCode(48, 58);
  }

  /**
   * Generates a list random digits strings.
   * Generation occurs from UTF-16 code, range: [48, 57].
   * 
   * @static
   */
  static randDigitList(length: number = 1): Generator<string> {
    return RandomSymbol.randCharCodeList(48, 57, length);
  }

  /* Letters (Latin) */

  /**
   * Generates a random lowercase latin letter.
   * Generation occurs from UTF-16 codes in inclusive range: [97, 122].
   * 
   * @static
   */
  static randLetterLower(): string {
    return RandomSymbol.randCharCode(97, 122);
  }

  /**
   * Generates a list random lowercase lating letter strings.
   * Generation occurs from UTF-16 code, range: [97, 122].
   * 
   * @static
   */
  static randLetterLowerList(length: number = 1): Generator<string> {
    return RandomSymbol.randCharCodeList(97, 122, length);
  }

  /**
   * Generates a random uppercase latin letter.
   * Generation occurs from UTF-16 codes in inclusive range: [65, 90].
   * 
   * @static
   */
  static randLetterUpper(): string {
    return RandomSymbol.randCharCode(65, 90);
  }

  /**
   * Generates a list random uppercase lating letter strings.
   * Generation occurs from UTF-16 code, range: [65, 90].
   * 
   * @static
   */
  static randLetterUpperList(length: number = 1): Generator<string> {
    return RandomSymbol.randCharCodeList(65, 90, length);
  }

  /* Symbols */

  /**
   * Generates random symbol string allowed for secure passwords.
   */
  static randSymbolSpecial(): string {
    return RandomSymbol.randArrElement(
      RandomSymbol.symbolsAllowedList
    );
  }

  /**
   * Generates random symbol.
   * 
   * @static
   */
  static randSymbol(): string {
    // type of random symbols
    // will be used to construct a method's name
    const randType = RandomSymbol.randArrElement([
      "Digit",
      "LetterLower",
      "LetterUpper",
      "SymbolSpecial"
    ]);

    return RandomSymbol[`rand${randType}`]();
  }

}