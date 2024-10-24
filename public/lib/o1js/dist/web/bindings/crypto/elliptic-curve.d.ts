export { Pallas, PallasAffine, Vesta, CurveParams, GroupAffine, GroupProjective, GroupMapPallas, createCurveProjective, createCurveAffine, CurveAffine, ProjectiveCurve, affineAdd, affineDouble, affineScale, projectiveFromAffine, projectiveToAffine, projectiveZero, projectiveAdd, projectiveDouble, projectiveNeg, };
declare const projectiveZero: {
    x: bigint;
    y: bigint;
    z: bigint;
};
type GroupProjective = {
    x: bigint;
    y: bigint;
    z: bigint;
};
type PointAtInfinity = {
    x: bigint;
    y: bigint;
    infinity: true;
};
type FinitePoint = {
    x: bigint;
    y: bigint;
    infinity: false;
};
type GroupAffine = PointAtInfinity | FinitePoint;
/**
 * Parameters defining an elliptic curve in short Weierstraß form
 * y^2 = x^3 + ax + b
 */
type CurveParams = {
    /**
     * Human-friendly name for the curve
     */
    name: string;
    /**
     * Base field modulus
     */
    modulus: bigint;
    /**
     * Scalar field modulus = group order
     */
    order: bigint;
    /**
     * Cofactor = size of EC / order
     *
     * This can be left undefined if the cofactor is 1.
     */
    cofactor?: bigint;
    /**
     * Generator point
     */
    generator: {
        x: bigint;
        y: bigint;
    };
    /**
     * The `a` parameter in the curve equation y^2 = x^3 + ax + b
     */
    a: bigint;
    /**
     * The `b` parameter in the curve equation y^2 = x^3 + ax + b
     */
    b: bigint;
    endoBase?: bigint;
    endoScalar?: bigint;
};
declare const GroupMapPallas: {
    potentialXs: (t: bigint) => [bigint, bigint, bigint];
    tryDecode: (x: bigint) => {
        x: bigint;
        y: bigint;
    } | undefined;
};
declare function projectiveNeg({ x, y, z }: GroupProjective, p: bigint): {
    x: bigint;
    y: bigint;
    z: bigint;
};
declare function projectiveAdd(g: GroupProjective, h: GroupProjective, p: bigint): GroupProjective;
declare function projectiveDouble(g: GroupProjective, p: bigint): GroupProjective;
declare function projectiveFromAffine({ x, y, infinity, }: GroupAffine): GroupProjective;
declare function projectiveToAffine(g: GroupProjective, p: bigint): GroupAffine;
/**
 * Projective curve arithmetic in Jacobian coordinates
 */
declare function createCurveProjective({ name, modulus: p, order, cofactor, generator, b, a, endoBase, endoScalar, }: CurveParams): {
    name: string;
    modulus: bigint;
    order: bigint;
    cofactor: bigint;
    zero: {
        x: bigint;
        y: bigint;
        z: bigint;
    };
    one: {
        z: bigint;
        x: bigint;
        y: bigint;
    };
    readonly endoBase: bigint;
    readonly endoScalar: bigint;
    a: bigint;
    b: bigint;
    hasCofactor: boolean;
    equal(g: GroupProjective, h: GroupProjective): boolean;
    isOnCurve(g: GroupProjective): boolean;
    isInSubgroup(g: GroupProjective): boolean;
    add(g: GroupProjective, h: GroupProjective): GroupProjective;
    double(g: GroupProjective): GroupProjective;
    negate(g: GroupProjective): {
        x: bigint;
        y: bigint;
        z: bigint;
    };
    sub(g: GroupProjective, h: GroupProjective): GroupProjective;
    scale(g: GroupProjective, s: bigint): {
        x: bigint;
        y: bigint;
        z: bigint;
    };
    endomorphism({ x, y, z }: GroupProjective): {
        x: bigint;
        y: bigint;
        z: bigint;
    };
    toAffine(g: GroupProjective): GroupAffine;
    fromAffine(a: GroupAffine): GroupProjective;
};
type ProjectiveCurve = ReturnType<typeof createCurveProjective>;
declare const Pallas: {
    name: string;
    modulus: bigint;
    order: bigint;
    cofactor: bigint;
    zero: {
        x: bigint;
        y: bigint;
        z: bigint;
    };
    one: {
        z: bigint;
        x: bigint;
        y: bigint;
    };
    readonly endoBase: bigint;
    readonly endoScalar: bigint;
    a: bigint;
    b: bigint;
    hasCofactor: boolean;
    equal(g: GroupProjective, h: GroupProjective): boolean;
    isOnCurve(g: GroupProjective): boolean;
    isInSubgroup(g: GroupProjective): boolean;
    add(g: GroupProjective, h: GroupProjective): GroupProjective;
    double(g: GroupProjective): GroupProjective;
    negate(g: GroupProjective): {
        x: bigint;
        y: bigint;
        z: bigint;
    };
    sub(g: GroupProjective, h: GroupProjective): GroupProjective;
    scale(g: GroupProjective, s: bigint): {
        x: bigint;
        y: bigint;
        z: bigint;
    };
    endomorphism({ x, y, z }: GroupProjective): {
        x: bigint;
        y: bigint;
        z: bigint;
    };
    toAffine(g: GroupProjective): GroupAffine;
    fromAffine(a: GroupAffine): GroupProjective;
};
declare const Vesta: {
    name: string;
    modulus: bigint;
    order: bigint;
    cofactor: bigint;
    zero: {
        x: bigint;
        y: bigint;
        z: bigint;
    };
    one: {
        z: bigint;
        x: bigint;
        y: bigint;
    };
    readonly endoBase: bigint;
    readonly endoScalar: bigint;
    a: bigint;
    b: bigint;
    hasCofactor: boolean;
    equal(g: GroupProjective, h: GroupProjective): boolean;
    isOnCurve(g: GroupProjective): boolean;
    isInSubgroup(g: GroupProjective): boolean;
    add(g: GroupProjective, h: GroupProjective): GroupProjective;
    double(g: GroupProjective): GroupProjective;
    negate(g: GroupProjective): {
        x: bigint;
        y: bigint;
        z: bigint;
    };
    sub(g: GroupProjective, h: GroupProjective): GroupProjective;
    scale(g: GroupProjective, s: bigint): {
        x: bigint;
        y: bigint;
        z: bigint;
    };
    endomorphism({ x, y, z }: GroupProjective): {
        x: bigint;
        y: bigint;
        z: bigint;
    };
    toAffine(g: GroupProjective): GroupAffine;
    fromAffine(a: GroupAffine): GroupProjective;
};
declare function affineAdd(g: GroupAffine, h: GroupAffine, p: bigint): GroupAffine;
declare function affineDouble({ x, y, infinity }: GroupAffine, p: bigint): GroupAffine;
declare function affineScale(g: GroupAffine, s: bigint | boolean[], p: bigint): GroupAffine;
type CurveAffine = ReturnType<typeof createCurveAffine>;
declare const PallasAffine: {
    name: string;
    /**
     * Arithmetic over the base field
     */
    Field: {
        modulus: bigint;
        sizeInBits: number;
        t: bigint;
        M: bigint;
        twoadicRoot: bigint;
        mod(x: bigint): bigint;
        add(x: bigint, y: bigint): bigint;
        not(x: bigint, bits: number): bigint;
        negate(x: bigint): bigint;
        sub(x: bigint, y: bigint): bigint;
        mul(x: bigint, y: bigint): bigint;
        inverse: (x: bigint) => bigint | undefined;
        div(x: bigint, y: bigint): bigint | undefined;
        square(x: bigint): bigint;
        isSquare(x: bigint): boolean;
        sqrt(x: bigint): bigint | undefined;
        power(x: bigint, n: bigint): bigint;
        dot(x: bigint[], y: bigint[]): bigint;
        equal(x: bigint, y: bigint): boolean;
        isEven(x: bigint): boolean;
        random(): bigint;
        fromNumber(x: number): bigint;
        fromBigint(x: bigint): bigint;
        rot(x: bigint, bits: bigint, direction?: "left" | "right", maxBits?: bigint): bigint;
        leftShift(x: bigint, bits: number, maxBitSize?: number): bigint;
        rightShift(x: bigint, bits: number): bigint;
    };
    /**
     * Arithmetic over the scalar field
     */
    Scalar: {
        modulus: bigint;
        sizeInBits: number;
        t: bigint;
        M: bigint;
        twoadicRoot: bigint;
        mod(x: bigint): bigint;
        add(x: bigint, y: bigint): bigint;
        not(x: bigint, bits: number): bigint;
        negate(x: bigint): bigint;
        sub(x: bigint, y: bigint): bigint;
        mul(x: bigint, y: bigint): bigint;
        inverse: (x: bigint) => bigint | undefined;
        div(x: bigint, y: bigint): bigint | undefined;
        square(x: bigint): bigint;
        isSquare(x: bigint): boolean;
        sqrt(x: bigint): bigint | undefined;
        power(x: bigint, n: bigint): bigint;
        dot(x: bigint[], y: bigint[]): bigint;
        equal(x: bigint, y: bigint): boolean;
        isEven(x: bigint): boolean;
        random(): bigint;
        fromNumber(x: number): bigint;
        fromBigint(x: bigint): bigint;
        rot(x: bigint, bits: bigint, direction?: "left" | "right", maxBits?: bigint): bigint;
        leftShift(x: bigint, bits: number, maxBitSize?: number): bigint;
        rightShift(x: bigint, bits: number): bigint;
    };
    modulus: bigint;
    order: bigint;
    a: bigint;
    b: bigint;
    cofactor: bigint | undefined;
    hasCofactor: boolean;
    zero: PointAtInfinity;
    one: {
        infinity: boolean;
        x: bigint;
        y: bigint;
    };
    hasEndomorphism: boolean;
    readonly Endo: {
        scalar: bigint;
        base: bigint;
        decomposeMaxBits: number;
        decompose(s: bigint): readonly [{
            readonly value: bigint;
            readonly isNegative: boolean;
            readonly abs: bigint;
        }, {
            readonly value: bigint;
            readonly isNegative: boolean;
            readonly abs: bigint;
        }];
        endomorphism(P: GroupAffine): {
            x: bigint;
            y: bigint;
        };
        scaleProjective(g: GroupProjective, s: bigint): {
            x: bigint;
            y: bigint;
            z: bigint;
        };
        scale(g: GroupAffine, s: bigint): GroupAffine;
    };
    from(g: {
        x: bigint;
        y: bigint;
    }): GroupAffine;
    fromNonzero(g: {
        x: bigint;
        y: bigint;
    }): GroupAffine;
    equal(g: GroupAffine, h: GroupAffine): boolean;
    isOnCurve(g: GroupAffine): boolean;
    isInSubgroup(g: GroupAffine): boolean;
    add(g: GroupAffine, h: GroupAffine): GroupAffine;
    double(g: GroupAffine): GroupAffine;
    negate(g: GroupAffine): GroupAffine;
    sub(g: GroupAffine, h: GroupAffine): GroupAffine;
    scale(g: GroupAffine, s: bigint | boolean[]): GroupAffine;
};
declare function createCurveAffine({ name, modulus: p, order, cofactor, generator, a, b, endoScalar, endoBase, }: CurveParams): {
    name: string;
    /**
     * Arithmetic over the base field
     */
    Field: {
        modulus: bigint;
        sizeInBits: number;
        t: bigint;
        M: bigint;
        twoadicRoot: bigint;
        mod(x: bigint): bigint;
        add(x: bigint, y: bigint): bigint;
        not(x: bigint, bits: number): bigint;
        negate(x: bigint): bigint;
        sub(x: bigint, y: bigint): bigint;
        mul(x: bigint, y: bigint): bigint;
        inverse: (x: bigint) => bigint | undefined;
        div(x: bigint, y: bigint): bigint | undefined;
        square(x: bigint): bigint;
        isSquare(x: bigint): boolean;
        sqrt(x: bigint): bigint | undefined;
        power(x: bigint, n: bigint): bigint;
        dot(x: bigint[], y: bigint[]): bigint;
        equal(x: bigint, y: bigint): boolean;
        isEven(x: bigint): boolean;
        random(): bigint;
        fromNumber(x: number): bigint;
        fromBigint(x: bigint): bigint;
        rot(x: bigint, bits: bigint, direction?: "left" | "right", maxBits?: bigint): bigint;
        leftShift(x: bigint, bits: number, maxBitSize?: number): bigint;
        rightShift(x: bigint, bits: number): bigint;
    };
    /**
     * Arithmetic over the scalar field
     */
    Scalar: {
        modulus: bigint;
        sizeInBits: number;
        t: bigint;
        M: bigint;
        twoadicRoot: bigint;
        mod(x: bigint): bigint;
        add(x: bigint, y: bigint): bigint;
        not(x: bigint, bits: number): bigint;
        negate(x: bigint): bigint;
        sub(x: bigint, y: bigint): bigint;
        mul(x: bigint, y: bigint): bigint;
        inverse: (x: bigint) => bigint | undefined;
        div(x: bigint, y: bigint): bigint | undefined;
        square(x: bigint): bigint;
        isSquare(x: bigint): boolean;
        sqrt(x: bigint): bigint | undefined;
        power(x: bigint, n: bigint): bigint;
        dot(x: bigint[], y: bigint[]): bigint;
        equal(x: bigint, y: bigint): boolean;
        isEven(x: bigint): boolean;
        random(): bigint;
        fromNumber(x: number): bigint;
        fromBigint(x: bigint): bigint;
        rot(x: bigint, bits: bigint, direction?: "left" | "right", maxBits?: bigint): bigint;
        leftShift(x: bigint, bits: number, maxBitSize?: number): bigint;
        rightShift(x: bigint, bits: number): bigint;
    };
    modulus: bigint;
    order: bigint;
    a: bigint;
    b: bigint;
    cofactor: bigint | undefined;
    hasCofactor: boolean;
    zero: PointAtInfinity;
    one: {
        infinity: boolean;
        x: bigint;
        y: bigint;
    };
    hasEndomorphism: boolean;
    readonly Endo: {
        scalar: bigint;
        base: bigint;
        decomposeMaxBits: number;
        decompose(s: bigint): readonly [{
            readonly value: bigint;
            readonly isNegative: boolean;
            readonly abs: bigint;
        }, {
            readonly value: bigint;
            readonly isNegative: boolean;
            readonly abs: bigint;
        }];
        endomorphism(P: GroupAffine): {
            x: bigint;
            y: bigint;
        };
        scaleProjective(g: GroupProjective, s: bigint): {
            x: bigint;
            y: bigint;
            z: bigint;
        };
        scale(g: GroupAffine, s: bigint): GroupAffine;
    };
    from(g: {
        x: bigint;
        y: bigint;
    }): GroupAffine;
    fromNonzero(g: {
        x: bigint;
        y: bigint;
    }): GroupAffine;
    equal(g: GroupAffine, h: GroupAffine): boolean;
    isOnCurve(g: GroupAffine): boolean;
    isInSubgroup(g: GroupAffine): boolean;
    add(g: GroupAffine, h: GroupAffine): GroupAffine;
    double(g: GroupAffine): GroupAffine;
    negate(g: GroupAffine): GroupAffine;
    sub(g: GroupAffine, h: GroupAffine): GroupAffine;
    scale(g: GroupAffine, s: bigint | boolean[]): GroupAffine;
};