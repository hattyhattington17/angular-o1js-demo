import { MlBool, MlOption } from '../../../lib/ml/base.js';
import { fieldFromRust, fieldToRust } from './conversion-base.js';
import { freeOnFinalize, } from './conversion-core.js';
export { verifierIndexConversion };
function verifierIndexConversion(wasm, core) {
    return {
        fp: verifierIndexConversionPerField(wasm, core.fp, {
            Domain: wasm.WasmFpDomain,
            VerificationEvals: wasm.WasmFpPlonkVerificationEvals,
            Shifts: wasm.WasmFpShifts,
            VerifierIndex: wasm.WasmFpPlonkVerifierIndex,
            LookupVerifierIndex: wasm.WasmFpLookupVerifierIndex,
            LookupSelector: wasm.WasmFpLookupSelectors,
        }),
        fq: verifierIndexConversionPerField(wasm, core.fq, {
            Domain: wasm.WasmFqDomain,
            VerificationEvals: wasm.WasmFqPlonkVerificationEvals,
            Shifts: wasm.WasmFqShifts,
            VerifierIndex: wasm.WasmFqPlonkVerifierIndex,
            LookupVerifierIndex: wasm.WasmFqLookupVerifierIndex,
            LookupSelector: wasm.WasmFqLookupSelectors,
        }),
    };
}
function verifierIndexConversionPerField(wasm, core, { Domain, VerificationEvals, Shifts, VerifierIndex, LookupVerifierIndex, LookupSelector, }) {
    function domainToRust([, logSizeOfGroup, groupGen]) {
        return new Domain(logSizeOfGroup, fieldToRust(groupGen));
    }
    function domainFromRust(domain) {
        let logSizeOfGroup = domain.log_size_of_group;
        let groupGen = fieldFromRust(domain.group_gen);
        domain.free();
        return [0, logSizeOfGroup, groupGen];
    }
    function verificationEvalsToRust(evals) {
        let sigmaComm = core.polyCommsToRust(evals[1]);
        let coefficientsComm = core.polyCommsToRust(evals[2]);
        let genericComm = core.polyCommToRust(evals[3]);
        let psmComm = core.polyCommToRust(evals[4]);
        let completeAddComm = core.polyCommToRust(evals[5]);
        let mulComm = core.polyCommToRust(evals[6]);
        let emulComm = core.polyCommToRust(evals[7]);
        let endomulScalarComm = core.polyCommToRust(evals[8]);
        let xorComm = MlOption.mapFrom(evals[9], core.polyCommToRust);
        let rangeCheck0Comm = MlOption.mapFrom(evals[10], core.polyCommToRust);
        let rangeCheck1Comm = MlOption.mapFrom(evals[11], core.polyCommToRust);
        let foreignFieldAddComm = MlOption.mapFrom(evals[12], core.polyCommToRust);
        let foreignFieldMulComm = MlOption.mapFrom(evals[13], core.polyCommToRust);
        let rotComm = MlOption.mapFrom(evals[14], core.polyCommToRust);
        return new VerificationEvals(sigmaComm, coefficientsComm, genericComm, psmComm, completeAddComm, mulComm, emulComm, endomulScalarComm, xorComm, rangeCheck0Comm, rangeCheck1Comm, foreignFieldAddComm, foreignFieldMulComm, rotComm);
    }
    function verificationEvalsFromRust(evals) {
        let mlEvals = [
            0,
            core.polyCommsFromRust(evals.sigma_comm),
            core.polyCommsFromRust(evals.coefficients_comm),
            core.polyCommFromRust(evals.generic_comm),
            core.polyCommFromRust(evals.psm_comm),
            core.polyCommFromRust(evals.complete_add_comm),
            core.polyCommFromRust(evals.mul_comm),
            core.polyCommFromRust(evals.emul_comm),
            core.polyCommFromRust(evals.endomul_scalar_comm),
            MlOption.mapTo(evals.xor_comm, core.polyCommFromRust),
            MlOption.mapTo(evals.range_check0_comm, core.polyCommFromRust),
            MlOption.mapTo(evals.range_check1_comm, core.polyCommFromRust),
            MlOption.mapTo(evals.foreign_field_add_comm, core.polyCommFromRust),
            MlOption.mapTo(evals.foreign_field_mul_comm, core.polyCommFromRust),
            MlOption.mapTo(evals.rot_comm, core.polyCommFromRust),
        ];
        evals.free();
        return mlEvals;
    }
    function lookupVerifierIndexToRust(lookup) {
        let [, joint_lookup_used, lookup_table, selectors, table_ids, lookup_info, runtime_tables_selector,] = lookup;
        return new LookupVerifierIndex(MlBool.from(joint_lookup_used), core.polyCommsToRust(lookup_table), lookupSelectorsToRust(selectors), MlOption.mapFrom(table_ids, core.polyCommToRust), lookupInfoToRust(lookup_info), MlOption.mapFrom(runtime_tables_selector, core.polyCommToRust));
    }
    function lookupVerifierIndexFromRust(lookup) {
        let mlLookup = [
            0,
            MlBool(lookup.joint_lookup_used),
            core.polyCommsFromRust(lookup.lookup_table),
            lookupSelectorsFromRust(lookup.lookup_selectors),
            MlOption.mapTo(lookup.table_ids, core.polyCommFromRust),
            lookupInfoFromRust(lookup.lookup_info),
            MlOption.mapTo(lookup.runtime_tables_selector, core.polyCommFromRust),
        ];
        lookup.free();
        return mlLookup;
    }
    function lookupSelectorsToRust([, lookup, xor, range_check, ffmul,]) {
        return new LookupSelector(MlOption.mapFrom(xor, core.polyCommToRust), MlOption.mapFrom(lookup, core.polyCommToRust), MlOption.mapFrom(range_check, core.polyCommToRust), MlOption.mapFrom(ffmul, core.polyCommToRust));
    }
    function lookupSelectorsFromRust(selector) {
        let lookup = MlOption.mapTo(selector.lookup, core.polyCommFromRust);
        let xor = MlOption.mapTo(selector.xor, core.polyCommFromRust);
        let range_check = MlOption.mapTo(selector.range_check, core.polyCommFromRust);
        let ffmul = MlOption.mapTo(selector.ffmul, core.polyCommFromRust);
        selector.free();
        return [0, lookup, xor, range_check, ffmul];
    }
    function lookupInfoToRust([, maxPerRow, maxJointSize, features,]) {
        let [, patterns, joint_lookup_used, uses_runtime_tables] = features;
        let [, xor, lookup, range_check, foreign_field_mul] = patterns;
        let wasmPatterns = new wasm.LookupPatterns(MlBool.from(xor), MlBool.from(lookup), MlBool.from(range_check), MlBool.from(foreign_field_mul));
        let wasmFeatures = new wasm.LookupFeatures(wasmPatterns, MlBool.from(joint_lookup_used), MlBool.from(uses_runtime_tables));
        return new wasm.LookupInfo(maxPerRow, maxJointSize, wasmFeatures);
    }
    function lookupInfoFromRust(info) {
        let features = info.features;
        let patterns = features.patterns;
        let mlInfo = [
            0,
            info.max_per_row,
            info.max_joint_size,
            [
                0,
                [
                    0,
                    MlBool(patterns.xor),
                    MlBool(patterns.lookup),
                    MlBool(patterns.range_check),
                    MlBool(patterns.foreign_field_mul),
                ],
                MlBool(features.joint_lookup_used),
                MlBool(features.uses_runtime_tables),
            ],
        ];
        info.free();
        return mlInfo;
    }
    let self = {
        shiftsToRust([, ...shifts]) {
            let s = shifts.map((s) => fieldToRust(s));
            return new Shifts(s[0], s[1], s[2], s[3], s[4], s[5], s[6]);
        },
        shiftsFromRust(s) {
            let shifts = [s.s0, s.s1, s.s2, s.s3, s.s4, s.s5, s.s6];
            s.free();
            return [0, ...shifts.map(fieldFromRust)];
        },
        verifierIndexToRust(vk) {
            let domain = domainToRust(vk[1]);
            let maxPolySize = vk[2];
            let nPublic = vk[3];
            let prevChallenges = vk[4];
            let srs = vk[5];
            let evals = verificationEvalsToRust(vk[6]);
            let shifts = self.shiftsToRust(vk[7]);
            let lookupIndex = MlOption.mapFrom(vk[8], lookupVerifierIndexToRust);
            let zkRows = vk[9];
            return new VerifierIndex(domain, maxPolySize, nPublic, prevChallenges, srs, evals, shifts, lookupIndex, zkRows);
        },
        verifierIndexFromRust(vk) {
            let mlVk = [
                0,
                domainFromRust(vk.domain),
                vk.max_poly_size,
                vk.public_,
                vk.prev_challenges,
                freeOnFinalize(vk.srs),
                verificationEvalsFromRust(vk.evals),
                self.shiftsFromRust(vk.shifts),
                MlOption.mapTo(vk.lookup_index, lookupVerifierIndexFromRust),
                vk.zk_rows
            ];
            vk.free();
            return mlVk;
        },
    };
    return self;
}
//# sourceMappingURL=conversion-verifier-index.js.map