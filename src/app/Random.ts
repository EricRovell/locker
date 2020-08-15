/**
 * Random values provider.
 */
export default class Random {
  /**
   * Generates a Uint32Array filled with random values.
   * @param integers - number of integers inside the array.
   * 
   * Max generated values is 2**32 - 1 
   * 
   * @static
   */
  static Uint32ArrayRandom(integers: number = 1): Uint32Array {
    return crypto.getRandomValues(
      new Uint32Array(integers)
    );
  }

  /* Floats */

  /**
   * Generates a random floating number.
   */
  static randFloat(): number {
    const twoIntegers = Random.Uint32ArrayRandom(2);
    // keep all 32 bits of the the first, top 20 of the second for 52 random bits
    const mantissa = twoIntegers[0] * (2 ** 20) + (twoIntegers[1] >>> 12);
    // shift all 52 bits to the right of the decimal point
    return mantissa * (2 ** (-52));
  }

  /**
   * Generates a list of random floating numbers.
   * Values are in range [0, 1).
   * @param length - The number of random values.
   * 
   * @static
   * @generator
   */
  static *randFloatList(length: number = 1): Generator<number> {
    const integers = Random.Uint32ArrayRandom(length * 2);

    for (let index = 0; index < integers.length; index += 2) {
      const mantissa = integers[index] * (2 ** 20) + (integers[index + 1] >>> 12);
      yield mantissa * (2 ** (-52));
    }
  }

  /**
   * Generates a random floating number in given range.
   * Left limit is inclusive, right is exclusive.
   * If max value is not specified, the range is [0, min)
   * @param min - Left limit.
   * @param max - Right limit.
   */
  static randFloatRange(min: number, max: number = 0): number {
    return (max === 0)
      ? Random.randFloat() * min
      : Random.randFloat() * (max - min) + min;
  }

  /**
   * Generates a list of random floating numbers for a given range.
   * Values are in range [0, 1).
   * @param length - The number of random values.
   * 
   * @static
   */
  static *randFloatRangeList(length: number = 1, min: number = 1, max: number = 0): Generator<number> {
    const randFloats = Random.randFloatList(length);
    for (let float of randFloats) {
      yield (max === 0)
        ? float * min
        : float * (max - min) + min;
    }
  }

  /* Integers */

  /**
   * Generates a random integer for specified range.
   * Right limit is exlusive, left is inclusive.
   * @param min - left limit.
   * @param max - right limit.
   */
  static randInt(min: number, max: number = 0): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    // new range is [0, min]
    if (max === 0) return Math.floor(Random.randFloat() * min);

    return Math.floor(Random.randFloat() * (max - min)) + min;
  }

  /**
   * Generates a random integer for specified range.
   * Both limits are inclusive.
   * @param min - left limit.
   * @param max - right limit.
   */
  static randIntInc(min: number, max: number = 0): number {
    return Random.randInt(min, max + 1);
  }

  /**
   * Generates a list of random itegers.
   * @param length - The number of random integers.
   */
  static *randIntList(length: number = 1, min: number = 1, max: number = 0): Generator<number> {
    const randFloats = Random.randFloatList(length);
    min = Math.ceil(min);
    max = Math.floor(max);
    for (let float of randFloats) {
      yield (max === 0)
        ? Math.floor(float * max)
        : Math.floor(float * (max - min)) + min; 
    }
  }

  /**
   * Generates a list of random integers. Inclusive.
   */
  static *randIntIncList(length: number = 1, min: number = 1, max: number = 0): Generator<number> {
    return Random.randIntList(length, min, max + 1);
  }

  /* Items */

  /**
   * Pulls out a random element from an array or a character from a string.
   * @param iterable - List of items or a string.
   */
  static randArrElement<T>(iterable: T[]): T {
    return iterable[
      Random.randInt(iterable.length)
    ];
  }

  /**
   * Pulls out a random word from a string.
   * 
   * @param text - string of words.
   * @param separator - words separator.
   */
  static randWord(text: string, separator: string = " "): string {
    const words = text
      .split(separator)
      .map(word => word.replace(/[^a-z]/gi, ""));
    return Random.randArrElement(words);
  }

}