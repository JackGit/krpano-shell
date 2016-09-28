import { expect } from 'chai';
import {
    CubeImage,
    CubeStripImage,
    SphereImage,
    CylinderImage
} from '../../../src/core/image';

describe('test core image', function () {

    let krShell = {};

    before(function () {
        krShell = {
            CubeImage: CubeImage,
            CubeStripImage: CubeStripImage,
            SphereImage: SphereImage,
            CylinderImage: CylinderImage
        };
    });

    it('should have CubeImage class', function () {
        expect(krShell).to.have.property('CubeImage');
    });

    it('should have CubeStripImage class', function () {
        expect(krShell).to.have.property('CubeStripImage');
    });

    it('should have SphereImage class', function () {
        expect(krShell).to.have.property('SphereImage');
    });

    it('should have CylinderImage class', function () {
        expect(krShell).to.have.property('CylinderImage');
    });
});