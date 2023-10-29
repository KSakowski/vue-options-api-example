export const getInitials = (username: string): string =>
{
    const parts = username.split(/[ -]/);
    let initials = '';

    for (let i = 0; i < parts.length; i++)
    {
        initials += parts[i].charAt(0);
    }

    if (initials.length > 3 && initials.search(/[A-Z]/) !== -1)
    {
        initials = initials.replace(/[a-z]+/g, '');
    }

    initials = initials.substr(0, 3).toUpperCase();

    return initials;
};
