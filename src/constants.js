export const PREVIEW_TYPE = {
    'SPHERE': 'SPHERE',
    'CYLINDER': 'CYLINDER',
    'CUBESTRIP': 'CUBESTRIP',
    grid (type, xSteps, ySteps, res, lineCol, bgCol, pntCol) {
        type || (type = 'CUBE');
        xSteps || (xSteps = 64);
        ySteps || (ySteps = 64);
        res || (res = 512);
        lineCol || (lineCol = '0x666666');
        bgCol || (bgCol = '0x222222');
        pntCol || (pntCol = lineCol);
        return 'grid(' + type + ',' + xSteps + ',' + ySteps + ',' + res + ',' + lineCol + ',' + bgCol + ',' + pntCol + ')';
    }
};

export const LIMIT_VIEW_TYPE = {
    OFF: 'off',
    AUTO: 'auto',
    LOOK_AT: 'lookat',
    RANGE: 'range',
    FULL_RANGE: 'fullrange',
    OFF_RANGE: 'offrange'
};

export const FOV_TYPE = {
    VFOV: 'VFOV',
    HFOV: 'HFOV',
    DFOV: 'DFOV',
    MFOV: 'MFOV'
};

export const IMAGE_TYPE = {
    CUBE: 'CUBE',
    CUBESTRIP: 'CUBESTRIP',
    SPHERE: 'SPHERE',
    CYLINDER: 'CYLINDER',
    FISHEYE: 'FISHEYE'
};