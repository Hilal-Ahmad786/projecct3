import {
    FaLinkedin,
    FaTwitter,
    FaGithub,
    FaInstagram,
    FaYoutube,
    FaDribbble,
    FaBehance,
    FaMedium,
    FaDiscord
} from 'react-icons/fa';

export const contactDetails = {
    phone: '+905525677164',
    email: 'info@paktechnology.com',
    website: 'https://paksoft.com.tr',
    address: 'Yozgat, Turkey',
    mapLink: 'https://maps.google.com/maps?q=Yozgat,Turkey',
    whatsapp: '905525677164' // Format for wa.me link
};

export const socialLinks = [
    {
        icon: FaLinkedin,
        href: 'https://linkedin.com/company/paktechnology',
        labelKey: 'socialMedia.linkedin',
        color: 'hover:bg-[#0077b5] hover:border-[#0077b5]'
    },
    {
        icon: FaTwitter,
        href: 'https://twitter.com/paktechnology',
        labelKey: 'socialMedia.twitter',
        color: 'hover:bg-[#1da1f2] hover:border-[#1da1f2]'
    },
    {
        icon: FaGithub,
        href: 'https://github.com/paktechnology',
        labelKey: 'socialMedia.github',
        color: 'hover:bg-[#333] hover:border-[#333]'
    },
    {
        icon: FaInstagram,
        href: 'https://instagram.com/paktechnology',
        labelKey: 'socialMedia.instagram',
        color: 'hover:bg-[#e1306c] hover:border-[#e1306c]'
    },
    {
        icon: FaYoutube,
        href: 'https://youtube.com/@paktechnology',
        labelKey: 'socialMedia.youtube',
        color: 'hover:bg-[#ff0000] hover:border-[#ff0000]'
    },
    {
        icon: FaDribbble,
        href: 'https://dribbble.com/paktechnology',
        labelKey: 'socialMedia.dribbble',
        color: 'hover:bg-[#ea4c89] hover:border-[#ea4c89]'
    },
    {
        icon: FaBehance,
        href: 'https://behance.net/paktechnology',
        labelKey: 'socialMedia.behance',
        color: 'hover:bg-[#1769ff] hover:border-[#1769ff]'
    },
    {
        icon: FaMedium,
        href: 'https://medium.com/@paktechnology',
        labelKey: 'socialMedia.medium',
        color: 'hover:bg-[#00ab6c] hover:border-[#00ab6c]'
    },
    {
        icon: FaDiscord,
        href: 'https://discord.gg/paktechnology',
        labelKey: 'socialMedia.discord',
        color: 'hover:bg-[#5865F2] hover:border-[#5865F2]'
    }
];
