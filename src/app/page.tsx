import type {Metadata} from 'next';
import SliderMain from '@/components/SliderMain/SliderMain';
import Anchor from '@/components/Anchor/Anchor';
import About from '@/components/About/About';
import Advantages from '@/components/Advantages/Advantages';
import LastWorks from '@/components/LastWorks/LastWorks';
import InStock from '@/components/InStock/InStock';
import Masters from '@/components/Masters/Masters';
import Process from '@/components/Process/Process';
import Categories from '@/components/Categories/Categories';
import Calculation from '@/components/Calculation/Calculation';
import Gallery from '@/components/Gallery/Gallery';
import Restoration from '@/components/Restoration/Restoration';
import Reviews from '@/components/Reviews/Reviews';
import News from '@/components/News/News';
import Faq from '@/components/Faq/Faq';

export const metadata: Metadata = {
    title: 'Иконописная мастерская',
    description: 'Иконописная мастерская - описание',
};

export default function Page() {
    return (
        <>
            <h1 className="visually-hidden">
                Иконописная мастерская
            </h1>

            <SliderMain/>
            <Anchor/>
            <About/>
            <Advantages/>
            <LastWorks/>
            <InStock/>
            <Masters/>
            <Process/>
            <Categories/>
            <Calculation/>
            <Gallery/>
            <Restoration/>
            <Reviews/>
            <News/>
            <Faq/>
        </>
    );
}
