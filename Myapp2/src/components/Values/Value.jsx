/* eslint-disable no-unused-vars */
import  { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import "./Value.css";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
    AccordionItemState,
} from "react-accessible-accordion";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { motion, useAnimation } from 'framer-motion';
import data from "../../utils/accordion.jsx";
import "react-accessible-accordion/dist/fancy-example.css";

function Value() {
    const controls = useAnimation();
    const [ref, inView] = useInView();
    const [animationPlayed, setAnimationPlayed] = useState(false);

    useEffect(() => {
        if (inView && !animationPlayed) {
            controls.start({
                opacity: 1,
                x: 0,
                transition: { duration: 4, type: "spring" }
            });
            setAnimationPlayed(true);
        }
    }, [controls, inView, animationPlayed]);

    return (
        <section id="value" className="v-wrapper">
            <div className="paddings innerWidth flexCenter v-container">
                {/* left side */}
                <div className="v-left">
                    <motion.div
                        ref={ref}
                        initial={{
                            opacity: 0,
                            x: "-30rem"
                        }}
                        animate={controls}
                        className="image-container"
                    >
                        <img src="images/value.png" alt="" />
                    </motion.div>
                </div>

                {/* right */}
                <div className="flexColStart v-right">
                    <span className="orangeText">Our Value</span>

                    <span className="primaryText">Value We Give to You</span>

                    <span className="secondaryText">
                        We always ready to help by providijng the best services for you.
                        <br />
                        We beleive a good blace to live can make your life better
                    </span>

                    <Accordion
                        className="accordion"
                        allowMultipleExpanded={false}
                        preExpanded={[0]}
                    >
                        {data.map((item, i) => {
                            return (
                                <AccordionItem
                                    className="accordionItem"
                                    uuid={i}
                                    key={i}
                                >
                                    <AccordionItemHeading>
                                        <AccordionItemButton className="flexCenter accordionButton">
                                            <div className="flexCenter icon">{item.icon}</div>
                                            <span className="primaryText">{item.heading}</span>
                                            <div className="flexCenter icon">
                                                <MdOutlineArrowDropDown size={20} />
                                            </div>
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p className="secondaryText">{item.detail}</p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}

export default Value;
