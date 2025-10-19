import { AnimatePresence, motion } from "framer-motion";

type CardProps = {
  readonly refSetter: (el: HTMLDivElement | null) => void;
  readonly title: string;
  readonly description: string;
  readonly skills: readonly string[];
  readonly borderTop?: boolean;
  readonly borderBottom?: boolean;
};

function CardWhatIDo({
  refSetter,
  title,
  description,
  skills,
  borderTop,
  borderBottom,
}: CardProps) {
  return (
    <motion.div
      ref={refSetter}
      layout
      transition={{ layout: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }}
      className={`relative bg-black/40 backdrop-blur-sm p-8 sm:p-10 rounded-xl transition-all duration-700 group cursor-pointer hover:bg-black/60 ${
        borderTop ? "border-t border-white/30" : ""
      } ${borderBottom ? "border-b border-white/30" : ""}`}
    >
      <div className="absolute top-0 left-0 w-3 h-3 border-t-4 border-l-4 border-white" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-4 border-r-4 border-white" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-4 border-l-4 border-white" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-4 border-r-4 border-white" />

      <h3 className="text-2xl sm:text-3xl font-extrabold mb-1 tracking-wide">
        {title}
      </h3>
      <h4 className="text-xs sm:text-sm font-light opacity-40 mb-2">
        Description
      </h4>
      <p className="text-sm leading-6 font-extralight text-white/80 mb-6">
        {description}
      </p>

      <div className="hidden md:block">
        <AnimatePresence>
          <motion.div
            key="skills"
            layout
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <h5 className="text-xs uppercase tracking-widest font-light text-white/70 mb-3">
              Skillset & tools
            </h5>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="text-xs px-3 py-1 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="block md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h5 className="text-xs uppercase tracking-widest font-light text-white/70 mb-3">
            Skillset & tools
          </h5>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                viewport={{ once: true }}
                className="text-xs px-3 py-1 rounded-full border border-white/30 bg-white/10"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ rotate: 0 }}
        whileHover={{ rotate: 180 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute bottom-5 right-5 w-[26px] h-[26px] border border-white flex items-center justify-center group-hover:rotate-180"
      >
        <motion.div
          className="w-[10px] h-[10px] border-l border-b border-white rotate-[-45deg]"
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

export default CardWhatIDo;
