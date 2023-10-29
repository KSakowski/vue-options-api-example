<template>
    <div class="flex items-center mb-6">
        <avatar :username="`${first_name} ${last_name}`" />
        <div class="ml-2">
            <div class="text-sm font-medium text-gray-900">
                {{ first_name }} {{ last_name }}
            </div>
            <div class="text-sm text-gray-500">
                {{ email }}
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from '@/helpers/decorators';
import { UserModel } from "@/interfaces";

@Options({})
export default class UserCard extends Vue
{
    @Prop() private user: UserModel;
    private get first_name(): string { return this.user?.first_name || "..." }
    private get last_name(): string { return this.user?.last_name || "..." }
    private get email(): string { return this.user?.email || "..." }
}
</script>
