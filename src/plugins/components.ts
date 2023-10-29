import { Plugin } from 'vue';
import BaseButton from "@/components/common/button/BaseButton.vue";
import ButtonGroup from "@/components/common/button/ButtonGroup.vue";
import BaseCard from "@/components/common/card/BaseCard.vue";
import FormInput from "@/components/form/form-input/FormInput.vue";
import FormSelect from "@/components/form/form-select/FormSelect.vue";
import FormTextarea from "@/components/form/form-textarea/FormTextarea.vue";
import FormGroup from "@/components/form/form-group/FormGroup.vue";
import FormCheckbox from "@/components/form/form-checkbox/FormCheckbox.vue";
import FormRadio from "@/components/form/form-radio/FormRadio.vue";
import FormDatePicker from "@/components/form/form-datepicker/FormDatePicker.vue";
import FormFileUpload from "@/components/form/form-file-upload/FormFileUpload.vue";
import Loading from "@/components/common/loading/Loading.vue";
import Spinner from "@/components/common/loading/Spinner.vue";
import Avatar from "@/components/common/avatar/Avatar.vue";
import Pagination from "@/components/pagination/Pagination.vue";
import Grid from "@/components/grid/Grid.vue";
import GridCell from "@/components/grid/GridCell.vue";
import Dropdown from "@/components/common/dropdown/Dropdown.vue";
import DropdownItem from "@/components/common/dropdown/DropdownItem.vue";
import HeroIcon from "@/components/common/icon/HeroIcon.vue";

const Components: Plugin = {
    install(app) {
        app.component('BaseButton', BaseButton);
        app.component('ButtonGroup', ButtonGroup);
        app.component('Card', BaseCard);
        app.component('FormGroup', FormGroup);
        app.component('FormInput', FormInput);
        app.component('FormSelect', FormSelect);
        app.component('FormTextarea', FormTextarea);
        app.component('FormCheckbox', FormCheckbox);
        app.component('FormRadio', FormRadio);
        app.component('FormDatePicker', FormDatePicker);
        app.component('FormFileUpload', FormFileUpload);
        app.component('Loading', Loading);
        app.component('Spinner', Spinner);
        app.component('Avatar', Avatar);
        app.component('Pagination', Pagination);
        app.component('Grid', Grid);
        app.component('GridCell', GridCell);
        app.component("HeroIcon", HeroIcon);
        app.component("Dropdown", Dropdown);
        app.component("DropdownItem", DropdownItem);
    },
};

export default Components;
