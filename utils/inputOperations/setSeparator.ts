import withSeparator from "@/utils/separator/withSeparator";


type Props = {
  event: any;
}

function setSeparator({event}:Props) {
  event.target.value = withSeparator(event.target.value);
}

export default setSeparator