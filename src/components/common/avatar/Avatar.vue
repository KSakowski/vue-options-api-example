<template>
    <div
        class="w-16 h-16 rounded-full inline-flex items-center align-middle justify-center text-sm"
        :style="[style, customStyle]"
        aria-hidden="true"
    >
        <img v-if="isImage" style="display: none" :src="src" loading="lazy" @error="onImgError" />
        <span v-show="!isImage">{{ userInitial }}</span>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from "@/helpers/decorators";
import { getInitials } from "@/components/common/avatar/initials";

@Options({
    name: 'user-avatar',
    emits: ['avatar-initials']
})
export default class Avatar extends Vue
{
    @Prop({ default: ' ' }) private username: string;
    @Prop({ default: '' }) private initials: string;
    @Prop({ default: '' }) private backgroundColor: string;
    @Prop({ default: '' }) private color: string;
    @Prop({ default: 36 }) private size: number;
    @Prop({ default: 16 }) private fontSize: number;
    @Prop({ default: 80 }) private lighten: number;
    @Prop() private src: string;
    @Prop() private customStyle: string;

    private backgroundColors: string[] = [
        '#10B982', '#1C68B6', '#FFA216', '#FF6416',
        '#33C293', '#5AD1AA', '#FFC56E', '#FF9F6E', '#33C293',
        '#10B982', '#1C68B6', '#FFA216', '#FF6416',
        '#33C293', '#EE1548', '#FFC56E', '#FF9F6E', '#009688',];

    private imgError = false;

    protected get background(): string
    {
        return !this.isImage ? this.backgroundColor || this.randomBackgroundColor(this.username.length, this.backgroundColors) : '';
    }

    protected get fontColor(): string
    {
        return !this.isImage ? this.color || this.lightenColor(this.background, this.lighten) : '';
    }

    protected get isImage(): boolean
    {
        const imageReg = (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(this.src);
        return !this.imgError && Boolean(this.src) && imageReg;
    }

    protected get style(): {[prop: string]: string}
    {
        const style = {};

        const imgBackgroundAndFontStyle = {
            background: `transparent url('${this.src}') no-repeat center center / cover`
        };

        const initialBackgroundAndFontStyle = {
            background: this.background,
            color: this.fontColor
        };

        const backgroundAndFontStyle = (this.isImage)
            ? imgBackgroundAndFontStyle
            : initialBackgroundAndFontStyle;

        const size = {
            minWidth: `${this.size}px`,
            width: `${this.size}px`,
            height: `${this.size}px`,
            fontSize: `${this.fontSize}px`,
        };

        Object.assign(style, backgroundAndFontStyle, size);

        return style;
    }

    protected get userInitial(): string
    {
        return !this.isImage ? this.initials || getInitials(this.username) : '';
    }

    public mounted(): void
    {
        if (!this.isImage)
        {
            this.$emit('avatar-initials', this.username, this.userInitial);
        }
    }

    private onImgError(): void
    {
        this.imgError = true;
    }

    private randomBackgroundColor(seed: number, colors: string[]): string
    {
        return colors[seed % (colors.length)];
    }

    private lightenColor(hex: string, amt: number): string
    {
        let usePound = false;

        if (hex[0] === '#')
        {
            hex = hex.slice(1);
            usePound = true;
        }

        const num = parseInt(hex, 16);
        let r = (num >> 16) + amt;

        if (r > 255) r = 255;
        else if (r < 0) r = 0;

        let b = ((num >> 8) & 0x00FF) + amt;

        if (b > 255) b = 255;
        else if (b < 0) b = 0;

        let g = (num & 0x0000FF) + amt;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
    }
}
</script>

