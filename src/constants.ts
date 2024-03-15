
/* MAIN */

const LINE_RE = /^(\s*)([*+-]?\s*)(.*)$/;
const LIST_RE = /^(\s*)([*+-]\s+)(.*)$/;
const TODO_RE = /^(\s*)([*+-]\s+\[[ xX]\]\s*)(.*)$/;
const TODO_BOX_RE = /^(\s*)([*+-]\s+\[ \]\s*)(.*)$/;
const TODO_DONE_RE = /^(\s*)([*+-]\s+\[[xX]\]\s*)(.*)$/;

/* EXPORT */

export {LINE_RE, LIST_RE, TODO_RE, TODO_BOX_RE, TODO_DONE_RE};
