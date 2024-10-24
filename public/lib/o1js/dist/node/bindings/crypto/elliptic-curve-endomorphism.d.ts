import { GroupAffine, GroupProjective } from './elliptic-curve.js';
import { FiniteField } from './finite-field.js';
export { Endomorphism, decompose, computeEndoConstants, computeGlvData, GlvData, };
/**
 * Define methods leveraging a curve endomorphism
 */
declare function Endomorphism(name: string, Field: FiniteField, Scalar: FiniteField, generator: GroupAffine, endoScalar?: bigint, endoBase?: bigint): {
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
} | undefined;
/**
 * GLV decomposition, named after the authors Gallant, Lambert and Vanstone who introduced it:
 * https://iacr.org/archive/crypto2001/21390189.pdf
 *
 * decompose scalar as s = s0 + s1 * lambda where |s0|, |s1| are small
 *
 * this relies on scalars v00, v01, v10, v11 which satisfy
 * - v00 + v10 * lambda = 0 (mod q)
 * - v01 + v11 * lambda = 0 (mod q)
 * - |vij| ~ sqrt(q), i.e. each vij has only about half the bits of the max scalar size
 *
 * the vij are computed in {@link egcdStopEarly}.
 *
 * for a scalar s, we pick x0, x1 (see below) and define
 * s0 = x0 v00 + x1 v01 + s
 * s1 = x0 v10 + x1 v11
 *
 * this yields a valid decomposition for _any_ choice of x0, x1, because
 * s0 + s1 * lambda = x0 (v00 + v10 * lambda) + x1 (v01 + v11 * lambda) + s = s (mod q)
 *
 * to ensure s0, s1 are small, x0, x1 are chosen as integer approximations to the rational solutions x0*, x1* of
 * x0* v00 + x1* v01 = -s
 * x0* v10 + x1* v11 = 0
 *
 * picking the integer xi that's closest to xi* gives us |xi - xi*| <= 0.5
 *
 * now, |vij| being small ensures that s0, s1 are small:
 *
 * |s0| = |(x0 - x0*) v00 + (x1 - x1*) v01| <= 0.5 * (|v00| + |v01|)
 * |s1| = |(x0 - x0*) v10 + (x1 - x1*) v11| <= 0.5 * (|v10| + |v11|)
 *
 * given |vij| ~ sqrt(q), we also get |s0|, |s1| ~ sqrt(q).
 */
declare function decompose(s: bigint, data: GlvData): readonly [{
    readonly value: bigint;
    readonly isNegative: boolean;
    readonly abs: bigint;
}, {
    readonly value: bigint;
    readonly isNegative: boolean;
    readonly abs: bigint;
}];
/**
 * Compute constants for curve endomorphism (cube roots of unity in base and scalar field)
 *
 * Throws if conditions for a cube root-based endomorphism are not met.
 */
declare function computeEndoConstants(Field: FiniteField, Scalar: FiniteField, G: GroupAffine): {
    endoScalar: bigint;
    endoBase: bigint;
};
/**
 * compute constants for GLV decomposition and upper bounds on s0, s1
 *
 * see {@link decompose}
 */
declare function computeGlvData(q: bigint, lambda: bigint): {
    v00: bigint;
    v01: bigint;
    v10: bigint;
    v11: bigint;
    det: bigint;
    maxS0: bigint;
    maxS1: bigint;
    maxBits: number;
};
type GlvData = ReturnType<typeof computeGlvData>;
