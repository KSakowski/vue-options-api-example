<template>
    <component :is="componentName" :class="`h-${size} w-${size}`" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from "@/helpers/decorators";
import {
    UserGroupIcon, ShoppingCartIcon, InformationCircleIcon, CreditCardIcon,
    FolderOpenIcon, TruckIcon, DocumentReportIcon, TicketIcon, RefreshIcon,
    ArrowLeftIcon, ArrowRightIcon, ClipboardCheckIcon, PencilAltIcon, FilmIcon, PlusIcon,
    CheckIcon, CloudUploadIcon, TrashIcon, CalculatorIcon, DocumentDownloadIcon,
    SearchIcon, UserIcon, LocationMarkerIcon, LinkIcon, XIcon,
    ChevronUpIcon, ChevronDownIcon, SelectorIcon, DocumentAddIcon,
    CheckCircleIcon, XCircleIcon, LogoutIcon, ArrowCircleLeftIcon, DocumentIcon,
    ExclamationCircleIcon,
} from "@heroicons/vue/outline";

@Options({
    components: {
        UserGroupIcon, ShoppingCartIcon, InformationCircleIcon, CreditCardIcon,
        FolderOpenIcon, TruckIcon, DocumentReportIcon, TicketIcon, RefreshIcon,
        ArrowLeftIcon, ArrowRightIcon, ClipboardCheckIcon, PencilAltIcon, FilmIcon, PlusIcon,
        CheckIcon, CloudUploadIcon, TrashIcon, CalculatorIcon, DocumentDownloadIcon,
        SearchIcon, UserIcon, LocationMarkerIcon, LinkIcon, XIcon,
        ChevronUpIcon, ChevronDownIcon, SelectorIcon, DocumentAddIcon,
        CheckCircleIcon, XCircleIcon, LogoutIcon, ArrowCircleLeftIcon, DocumentIcon,
        ExclamationCircleIcon,
    },
})
export default class HeroIcon extends Vue {
    @Prop({ default: 'user-group' })
    public icon: string;

    @Prop({ default: '5' })
    public size: string;

    private get componentName(): string {
        return `${this.icon}-icon`;
    }
}
</script>
