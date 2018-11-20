<template>
  <div>
    <main class="about container">
      <div class="about__header">
        <div class="about__header-content">
          <div v-html="why_exist"/>
        </div>
        <div class="about__header-image">
          <img src="/gallery/15.jpg" alt="HackYourFuture students during their class on Sunday.">
        </div>
      </div>
      <div class="about__container results">
        <div v-html="results_today"/>
        <div class="links">
          <nuxt-link :to="'/teach'">
            You want
            <br>to
            <span class="underline">help?</span>
          </nuxt-link>
          <nuxt-link :to="'/chapters'">
            You want
            <br>to
            <span class="underline">donate</span>
          </nuxt-link>
        </div>
      </div>
      <div class="about__container how">
        <div class="about__container-image">
          <img
            src="/gallery/07.jpg"
            alt="Overview, the opening and gathering of everyone in HackYourFuture before the classes start."
          >
        </div>
        <div v-html="how_school_works"/>
      </div>
      <TeamComponent :teachers="teachers" :team="team"/>
    </main>
  </div>
</template>
  
<script>
import axios from "~/plugins/axios";
import TeamComponent from "~/components/team/team";
const team = [
    {
        src: "/team/6.jpeg",
        name: "Wouter Kleijn",
        function: "Partnership Manager",
        href: "https://www.linkedin.com/in/gijs-corstens-3b998414/",
        mail: "mailto:wouter@hackyourfuture.net"
    },

    {
        src: "/mentors/35.jpeg",
        name: "Noer Paanakker",
        function: "Education Director",
        href: "https://www.linkedin.com/in/gijs-corstens-3b998414/",
        mail: "mailto:noer@hackyourfuture.net"
    },

    {
        src: "/team/4.jpeg",
        name: "Gijs Corstens",
        function: "Managing Director",
        href: "https://www.linkedin.com/in/wouter-kleijn-26820b12/",
        mail: "mailto:gijs@hackyourfuture.net"
    }
];
const teachers = [
    {
        src: "/mentors/6.jpg",
        name: "Unmesh Joshi",
        href: "https://www.linkedin.com/in/unmeshjoshi/"
    },

    {
        src: "/mentors/3.jpeg",
        name: "Jim Cramer",
        href: "https://www.linkedin.com/in/jim-cramer-3324aa11/"
    },

    {
        src: "/team/3.jpg",
        name: "Maartje Kruijt",
        href: "https://www.linkedin.com/in/maartje-kruijt-185ab2116/"
    },

    {
        src: "/mentors/2.jpg",
        name: "Mauro Mandracchia",
        href: "https://www.linkedin.com/in/ideabile/"
    },

    {
        src: "/mentors/21.jpeg",
        name: "Borislav Nikolov",
        href: "https://www.linkedin.com/in/borislav-nikolov-ba849b151/"
    },

    {
        src: "/mentors/15.jpeg",
        name: "Jason Gwartz",
        href: "https://www.linkedin.com/in/jason-gwartz/"
    },

    {
        src: "/mentors/1.jpeg",
        name: "Hardit Singh",
        href: "https://www.linkedin.com/in/hardit/"
    },

    {
        src: "/mentors/12.jpeg",
        name: "Joost Lubach",
        href: "https://www.linkedin.com/in/yoazt/"
    },

    {
        src: "/mentors/56.jpeg",
        name: "Mattijn Lahuis",
        class: "heart"
    },

    {
        src: "/mentors/13.jpeg",
        name: "Daan Aerts",
        href: "https://www.linkedin.com/in/daan-aerts-6667666b/"
    },

    {
        src: "/mentors/14.jpeg",
        name: "George Sapkin",
        href: "https://www.linkedin.com/in/georgesapkin/"
    },

    {
        src: "/mentors/31.jpeg",
        name: "Frank Versnel",
        href: "https://www.linkedin.com/in/frankversnel/"
    },

    {
        src: "/mentors/34.jpeg",
        name: "Laurens Aarnoudse",
        href: "https://www.linkedin.com/in/laurensaarnoudse/"
    },

    {
        src: "/mentors/16.jpeg",
        name: "Ariadne Gomes",
        href: "https://www.linkedin.com/in/ariadne/"
    },

    {
        src: "/mentors/17.jpeg",
        name: "Pablo Celentano",
        href: "https://www.linkedin.com/in/pcelentano/"
    },

    {
        src: "/mentors/24.jpeg",
        name: "Pablo Villoslada Puigcerber",
        href: "https://www.linkedin.com/in/puigcerber/"
    },

    {
        src: "/mentors/7.jpeg",
        name: "Nadine Jaradat",
        href: "https://www.linkedin.com/in/njaradat/"
    },

    {
        src: "/mentors/8.jpeg",
        name: "Tamim Al Manaseer",
        href: "https://www.linkedin.com/in/tamimmanaseer/"
    },

    {
        src: "/mentors/36.jpeg",
        name: "Philipp Beau",
        href: "https://www.linkedin.com/in/philippbeau/"
    },

    {
        src: "/mentors/4.jpeg",
        name: "Bonan Zhao",
        href: "https://www.linkedin.com/in/bonan-zhao/"
    },

    {
        src: "/mentors/5.jpeg",
        name: "Alexandre Borrego",
        href: "https://www.linkedin.com/in/alxbrg/"
    },

    {
        src: "/mentors/22.jpeg",
        name: "Valerio Barrila",
        href: "https://www.linkedin.com/in/barrilavalerio/"
    },

    {
        src: "/mentors/9.jpeg",
        name: "Ivana Setiawan",
        href: "https://www.linkedin.com/in/ivanasetiawan/"
    },

    {
        src: "/mentors/38.jpeg",
        name: "Maarten Vleugels",
        href: "https://www.linkedin.com/in/maartenvleugels/"
    },

    {
        src: "/mentors/10.jpeg",
        name: "Nouran Mhmoud",
        href: "https://www.linkedin.com/in/nouranmahmoud/"
    },

    {
        src: "/mentors/66.jpeg",
        name: "Arco Mul",
        href: "https://www.linkedin.com/in/arcomul/"
    },

    {
        src: "/mentors/33.jpeg",
        name: "Isaac Hinman",
        href: "https://www.linkedin.com/in/isaachinman/"
    },

    {
        src: "/mentors/11.jpeg",
        name: "Omnia Nour",
        href: "https://www.linkedin.com/in/omnianour/"
    },

    {
        src: "/mentors/67.jpeg",
        name: "Donaldson Chickeme",
        href: "https://www.linkedin.com/in/donaldson-chickeme-3b07a252/"
    },

    {
        src: "/mentors/37.jpeg",
        name: "Vincent Tunru",
        href: "https://www.linkedin.com/in/vinnl/"
    },

    {
        src: "/mentors/25.jpg",
        name: "Timir Karia",
        href: "https://www.linkedin.com/in/timirkaria/"
    },

    {
        src: "/mentors/23.jpeg",
        name: "Nasir Shadravan",
        href: "https://www.linkedin.com/in/nasir-shadravan/"
    },

    {
        src: "/mentors/18.jpeg",
        name: "Samir Aleido",
        href: "https://www.linkedin.com/in/eidosam/"
    },

    {
        src: "/mentors/20.jpg",
        name: "Tim Janisch",
        href: "https://www.linkedin.com/in/mattijn-lahuis-46729023/"
    },

    {
        src: "/mentors/29.jpg",
        name: "Martijn Beijk",
        href: "https://www.linkedin.com/in/martijnbeijk/"
    },

    {
        src: "/mentors/32.jpeg",
        name: "Ahmad Kabakibi",
        href: "https://www.linkedin.com/in/ahmadkabakibi/"
    },

    {
        src: "/mentors/30.jpg",
        name: "Yousef El - Dardiry",
        href: "https://www.linkedin.com/in/yousefed/"
    },

    {
        src: "/mentors/39.jpeg",
        name: "Michael Trouw",
        href: "https://www.linkedin.com/in/michaeltrouw/"
    },

    {
        src: "/mentors/40.jpeg",
        name: "Laurens Rietveld",
        href: "https://www.linkedin.com/in/laurens-rietveld-390a87a/"
    },

    {
        src: "/mentors/41.jpeg",
        name: "Filip Ilievski",
        href: "https://www.linkedin.com/in/filipilievski91/"
    },

    {
        src: "/mentors/42.jpg",
        name: "Hadi Mansoraty",
        href: "https://www.linkedin.com/in/hadi-mansoraty-35160aa4/"
    },

    {
        src: "/mentors/43.jpeg",
        name: "Erol Suleyman",
        href: "https://www.linkedin.com/in/erolsuleyman/"
    },

    {
        src: "/mentors/44.jpg",
        name: "Thom van Gessel",
        href: "https://www.linkedin.com/in/thomvangessel/"
    },

    {
        src: "/mentors/45.jpg",
        name: "Roel Witteman",
        href: "https://www.linkedin.com/in/roel-witteman-79a92565/"
    },

    {
        src: "/mentors/47.jpeg",
        name: "Michiel van der Ros",
        href: "https://www.linkedin.com/in/micros/"
    },

    {
        src: "/mentors/48.jpg",
        name: "Natan Santolo",
        href: "https://www.linkedin.com/in/natansantolo/"
    },

    {
        src: "/mentors/49.jpeg",
        name: "David Furlong",
        href: "https://www.linkedin.com/in/david-furlong-12616026/"
    },

    {
        src: "/mentors/50.jpg",
        name: "Camilo Martinez",
        href: "https://www.linkedin.com/in/camartinezsar/"
    },

    {
        src: "/mentors/51.jpg",
        name: "Gyula Weber",
        href: "https://www.linkedin.com/in/gyulaweber/"
    },

    {
        src: "/mentors/52.jpg",
        name: "Carlos Martinez",
        href: "https://www.linkedin.com/in/carlosmartinezortiz/"
    },

    {
        src: "/mentors/53.jpeg",
        name: "Richard A.Kraaijenhagen",
        href: "https://www.linkedin.com/in/riichard/"
    },

    {
        src: "/mentors/54.jpeg",
        name: "Rob Sutter",
        href: "https://www.linkedin.com/in/robsutter/"
    },

    {
        src: "/mentors/55.jpg",
        name: "Piotr Bakker",
        href: "https://www.linkedin.com/in/piotrbakker/"
    }
];
export default {
    components: {
        TeamComponent
    },
    data: () => {
        return {
            teachers,
            team
        };
    },
    async asyncData() {
        let why_exist;
        let results_today;
        let how_school_works;
        try {
            let req = await axios.get("/content/en/about/about-why_exist.json");
            let req1 = await axios.get(
                "/content/en/about/about-results_today.json"
            );
            let req2 = await axios.get(
                "/content/en/about/about-how_school_works.json"
            );
            why_exist = req.data.body;
            results_today = req1.data.body;
            how_school_works = req2.data.body;
        } catch (e) {
            console.log(e);
            why_exist = false;
            results_today = false;
            how_school_works = false;
        }
        return {
            why_exist: why_exist ? why_exist : null,
            results_today: results_today ? results_today : null,
            how_school_works: how_school_works ? how_school_works : null
        };
    }
};
</script>

  <style lang="scss">
.about {
    h1 {
        margin-bottom: $base-vertical-rithm * 2;
        font-weight: normal;
    }
    &__header {
        padding: $base-vertical-rithm * 10;
        margin-right: -100px;
        display: flex;
        @include breakpoint("ipad_portrait") {
            flex-wrap: wrap;
            margin: 0;
            padding: 0;
        }
        a {
            color: $color-purple;
            font-weight: bold;
            font-size: 32px;
            line-height: 40px;
            span:after {
                bottom: -5px;
            }
        }
        &-content {
            width: 70%;
            padding: $base-vertical-rithm * 10;
            @include breakpoint("ipad_portrait") {
                padding: 0;
                padding-top: $base-vertical-rithm * 1;
                width: 80%;
                margin: $base-vertical-rithm * 10 auto;
            }
            & > div {
                margin-top: $base-vertical-rithm * 5;
                @include breakpoint("ipad_portrait") {
                    margin-top: $base-vertical-rithm * 10;
                }
            }
        }
        &-image {
            vertical-align: top;
            width: 90%;
            @include breakpoint("ipad_portrait") {
                width: 100%;
                padding: 0;
            }
        }
    }
    &__container {
        margin: 0 $base-vertical-rithm * 10;
        @include breakpoint("ipad_portrait") {
            margin: 0;
        }
        &.how {
            margin-left: -50px;
            @include breakpoint("ipad_portrait") {
                margin-left: 0;
            }
            .about__container-image {
                margin-left: 0;
                @include breakpoint("ipad_portrait") {
                    padding: 0;
                    width: 100%;
                }
            }
        }
        &.who {
            margin-right: -100px;
            .about__container-image {
                margin-right: 0;
            }
        }
        .links {
            width: 25%;
            margin-left: 20%;
            @include breakpoint("ipad_portrait") {
                width: 100%;
                margin-left: 0;
                display: flex;
                justify-content: space-evenly;
            }
            a {
                color: black;
                font-size: 24px;
                line-height: 30px;
                @include breakpoint("ipad_portrait") {
                    line-height: 24px;
                }
            }
        }
        &.footer {
            .about__container-image {
                margin-left: 25%;
                width: 50%;
            }
        }
        & > div {
            display: inline-block;
            width: calc(50% - 100px);
            vertical-align: top;
            margin: 50px;
            @include breakpoint("ipad_portrait") {
                padding: 0;
                width: 80%;
                margin: $base-vertical-rithm * 10 auto;
                display: block;
            }
            a {
                color: $color-purple;
                font-weight: bold;
                font-size: 32px;
                line-height: 40px;
                margin-bottom: 40px;
                display: block;
                span:after {
                    bottom: -5px;
                }
            }
        }
    }
    &__footer {
        margin: 0 $base-vertical-rithm * 10;
        a {
            margin: 50px;
            display: inline-block;
            font-weight: bold;
            font-size: 30px;
            line-height: 40px;
            &:nth-child(2) {
                margin-left: 25%;
            }
        }
    }
}
</style>
