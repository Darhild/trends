export const changeImageSize = (image: string | undefined, size = '400x300') =>
    image && image.replace(/\/orig/, `/${size}`);
