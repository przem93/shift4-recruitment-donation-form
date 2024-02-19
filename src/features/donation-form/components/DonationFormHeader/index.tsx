import Image from 'next/image';
import { Flex } from "@/components/Flex";
import givingBlockIcon from "@/icons/GivingBlock.svg";
import { H1 } from '@/components/Typography/H1';
import { Span } from '@/components/Typography/Span';

export const DonationFormHeader = () => (
  <Flex alignItems="Center" gap={5}>
    <Image alt="Giving block icon" src={givingBlockIcon} />
    <div>
      <H1 color="MidnightPurple">The giving block</H1>
      <Span color="MidnightGrey" weight="Light">Set up your donation goal!</Span>
    </div>
  </Flex>
)
