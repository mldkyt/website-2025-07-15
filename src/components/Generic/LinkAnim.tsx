import { motion } from "motion/react";
import Link from "next/link";

export function LinkAnim(props: {
    link: string,
    children: string
}) {
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={"w-max"}
        >
            <Link
            href={props.link}
            className={"text-pink-400 hover:text-pink-200 block"}
            >
            {props.children}
            </Link>
        </motion.div>
    )
}
